define(["fuse", "jquery", "underscore", "controllers/vehicles.controller"], function(Fuse, $, _, VehiclesController) {
    return Fuse.Router.extend({
        routes: {
            "vehicles": "showVehicleList"
        },

        controller: new VehiclesController(),

        showVehicleList: function() {
        	this.controller.showVehicleList();
        }
    });
});
