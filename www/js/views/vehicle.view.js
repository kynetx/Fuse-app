define(["fuse", "jquery", "underscore", "models/vehicle.model", "text!templates/vehicletmpl.html", "text!templates/infowindowtmpl.html"], function(Fuse, $, _, VehicleModel, vehicleTmpl, infoWindowTmpl) {
    return Fuse.View.extend({
        tagName: "div",
        role: "page",
        id: "vehicle",
        transition: "slide",
        template: _.template(vehicleTmpl),
        infoWindowTemplate: _.template(infoWindowTmpl),

        events: {
            "tap .trigger-fillup"   : "showFillupForm",
            "submit #record-fillup" : "recordFillup",
            "change #num-gallons"   : "updateCost",
            "change #price-gallon"  : "updateCost"
        },


        initialize: function() {
            Fuse.View.prototype.initialize.apply(this, arguments);

            var temp = Number(_.clone(this.model.get('coolantTemperature')));
	    temp = (temp !== NaN) ? (((temp * 9) / 5) + 32).toFixed(1) : "unknown";   // this is where we'd use a preference
	    this.model.set("coolantTemperatureFaren", temp);

            this.header = this.model.get("profileName");
            this.content = this.template(this.model.toJSON());
        },

        render: function() {
            Fuse.View.prototype.render.apply(this, arguments);
        },

        showFillupForm: function() {
            this.$popup = $( "#fuel-popup-vehicle" );
            if ( this.$popup.length ) {
                this.getGasStations();
            } else {
                Fuse.log( "Popup could not be found." );
            }
        },

        recordFillup: function(e) {
            e.preventDefault();
            // Grab the values we want.
            var numGallons  = $( "#num-gallons" ).val(),
                priceGallon = $( "#price-gallon" ).val(),
                cost        = $( "#cost" ).val(),
                odometer    = $( "#odometer" ).val(),
                gasStation  = $( "#gas-station" ).val();

            this.controller.addFillup( numGallons, priceGallon, cost, odometer, gasStation );
            this.$popup.popup( "close" );
//            alert( "Success!" );
        },

        updateCost: function( e ) {
            e.preventDefault();

            var cost = ( $( "#num-gallons" ).val() * $( "#price-gallon" ).val() ).toFixed( 2 );
            $( "#cost" ).val( cost );

            e.handled = true;
        },

	// these are in fuel.view.js as well
	getGasStations: function() {
            // We make sure to bind the execution context of the callback to the view itself.
            Fuse.loading( "show", "Getting nearby gas stations..." );
//            Fuse.map.getNearbyPlaces( "gas_station", this.populateGasStations.bind( this ) );
            this.populateGasStations( [] );
        },

        populateGasStations: function( stations ) {
            var stationSelect = document.getElementById( "gas-station" ),
                otherOption = document.createElement( "option" );


            otherOption.setAttribute( "value", "other" );
            otherOption.innerHTML = "Other";

            stations.forEach(function( station ) {
                var info = station.name + " (" + station.vicinity + ")";
                var opt = document.createElement( "option" );
                opt.setAttribute( "value", info );
                opt.innerHTML = info;
                stationSelect.appendChild( opt );
            });

            stationSelect.appendChild( otherOption );

            Fuse.log( "Populated:", stationSelect, "with data:", stations );

            // Reset the form.
            $( "#num-gallons, #price-gallon, #cost, #gas-station" ).val( "" );
            $( "#gas-station > option[ val = 'default']" ).prop( "selected", true );
            $( "#gas-station" ).selectmenu( "refresh" );

            // If our model has a valid odometer value, pre-populate the odometer input.
            var odometer = this.model.get( "mileage" ) || this.model.get( "odometer" );
            if ( odometer ) {
                $( "#odometer" ).val( odometer );
            }

            Fuse.loading( "hide" );
            this.$popup.popup( "open" );
        }

    });
});
