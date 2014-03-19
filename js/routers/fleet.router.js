define(["fuse", "jquery", "underscore"], function(Fuse, $, _) {
    return Fuse.Router.extend({
        routes: {
            "fleet": "showFleet",
            "fleet/:id": "showVehicle",
            "findcar": "showFindCar",
            "findcar/:id": "showFindCar",
            "trips": "showTrips",
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

        showTrips: function() {
            this.invokeControllerFunction( "showTrips", arguments );
        }
    });
});
