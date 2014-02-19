define(["backbone", "jquery", "underscore", "views/vehicles.view"], function(Backbone, $, _, VehiclesView) {
    return {
        showVehicleList: function() {
            new VehiclesView();
        }
    };
});
