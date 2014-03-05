define(["fuse", "jquery", "underscore", "controllers/vehicles.controller"], function(Fuse, $, _, VehiclesController) {
    return Fuse.Router.extend({
        routes: {
            "vehicles": "showVehicleList",
            "vehicle/:id": "showVehicleDetail",
            "fleet": "showFleet"
        },

        controller: new VehiclesController(),

        showVehicleList: function() {
        	this.controller.showVehicleList();
        },

        showVehicleDetail: function(id) {
        	this.controller.showVehicleDetail(id);
        },

        showFleet: function() {
            this.controller.showFleet();
        },
    });
});
