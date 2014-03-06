define(["fuse", "jquery", "underscore", "controllers/vehicles.controller"], function(Fuse, $, _, VehiclesController) {
    return Fuse.Router.extend({
        routes: {
            "vehicles": "showVehicleList",
            "vehicle/:id": "showVehicleDetail",
            "findcar": "showFindCar"
        },

        controller: new VehiclesController(),

        showVehicleList: function() {
        	this.controller.showVehicleList();
        },

        showVehicleDetail: function(id) {
        	this.controller.showVehicleDetail(id);
        },

        showFindCar: function() {
            this.controller.showFindCar();
        },
    });
});
