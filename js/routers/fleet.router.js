define([ "fuse", "jquery", "underscore" ], function( Fuse, $, _ ) {
    return Fuse.Router.extend({
        routes: {
            "fleet": "showFleet",
            "fleet/:id": "showVehicle",
            "findcar": "showFindCar",
            "findcar/:id": "showFindCar",
            "fuelsmart": "showFuelSmart",
            "fuelsmart/:id": "showFuelSmart",
            "trips": "showTripAggregate",
            "trips/:id": "showTrips"
        },

        showFleet: function() {
        	this.invokeControllerFunction( "showFleet", arguments );
        },

        showVehicle: function() {
            this.invokeControllerFunction( "showVehicle", arguments );
        },

        showFindCar: function() {
            this.invokeControllerFunction( "showFindCar", arguments );
        },

        showTripAggregate: function() {
            this.invokeControllerFunction( "showTripAggregate", arguments );
        },

        showFuelSmart: function() {
            var args = arguments;

            // if we have an id.
            if (typeof args[0] !== "undefined") {
                this.controller.showFuelSmart(args[0]);
            } else {
                this.controller.showFuelSmart();
            }
        },
        
        showTrips: function( id ) {
            this.invokeControllerFunction( "showTrips", arguments );
        }
    });
});
