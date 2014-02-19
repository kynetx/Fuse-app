define(["backbone", "jquery", "underscore", "controllers/vehicles.controller"], function(Backbone, $, _, VehiclesController) {
    return Backbone.Router.extend({
        routes: {
            "vehicles": "showVehicleList"
        },
        showVehicleList: function() {
            VehiclesController.showVehicleList();
        }
    });
});
