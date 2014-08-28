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

            var temp = _.clone(this.model.get('coolantTemperature'));
	    this.model.set("coolantTemperature", ((temp * 9) / 5) + 32); // this is where we'd use a preference

            this.header = this.model.get("profileName");
            this.content = this.template(this.model.toJSON());
        },

        render: function() {
            Fuse.View.prototype.render.apply(this, arguments);
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
        }

    });
});
