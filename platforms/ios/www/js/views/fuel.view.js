define([ "backbone", "fuse", "jquery", "underscore", "text!templates/fueltmpl.html" ], function( Backbone, Fuse, $, _, fuelTmpl ) {
    return Fuse.View.extend({
        id: "fuel",
        tagName: "div",
        role: "page",
        transition: "slide",
        template: _.template( fuelTmpl ),

        events: {
            "tap .trigger-fillup"       : "showFillupForm",
            "submit #record-fillup"     : "recordFillup"
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            this.header = this.model.get( "nickname" );
        },

        render: function() {
            this.content = this.template({ vehicle: this.model.toJSON() });
            Fuse.View.prototype.render.call( this );
        },

        showFillupForm: function() {
            this.$popup = $( "#fuel-popup" );
            if ( this.$popup.length ) {
                this.getGasStations();
            } else {
                Fuse.log( "Popup could not be found." );
            }
        },

        recordFillup: function(e) {
            e.preventDefault();
            // Grab the values we want.
            var numGallons = $( "#num-gallons" ).val(),
                priceGallon = $( "#price-gallon" ).val(),
                odometer = $( "#odometer" ).val(),
                gasStation = $( "#gas-station" ).val();

            this.controller.addFillup( numGallons, priceGallon, odometer, gasStation );
            this.$popup.popup( "close" );
            alert( "Success!" );
        },

        nextMonth: function() {
            if ( Fuse.currentMonth < 11 ) {
                Fuse.currentMonth += 1;
            } else {
                Fuse.currentMonth = 0;
            }
        },

        previousMonth: function() {
            if ( Fuse.currentMonth > 0 ) {
                Fuse.currentMonth -= 1;
            } else {
                Fuse.currentMonth = 11;
            }
        },

        getGasStations: function() {
            // We make sure to bind the execution context of the callback to the view itself.
            Fuse.loading( "show", "Getting nearby gas stations." );
            Fuse.map.getNearbyPlaces( "gas_station", this.populateGasStations.bind( this ) );
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

            // If our model has a valid odometer value, pre-populate the odometer input.
            var odometer = this.model.get( "odometer" );
            if ( odometer ) {
                $( "#odometer" ).val( odometer );
            }

            Fuse.loading( "hide" );
            this.$popup.popup( "open" );
        }
    });
});
