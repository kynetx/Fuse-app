define(["fuse", "jquery", "underscore", "collections/vehicles.collection", "models/vehicle.model", "views/vehicles.view", "views/vehicle.view", "views/fleet.view"], function(Fuse, $, _, VehicleCollection, VehicleModel, VehiclesView, VehicleView, FleetView) {
    return Fuse.Controller.extend({
        showVehicleList: function() {
            new VehiclesView({
                collection: new VehicleCollection(Fuse.FIXTURES.vehicles)
            });
        },

        showVehicleDetail: function(id) {
            var vehicle = Fuse.FIXTURES.vehicles.filter(function(vehicle) {
                return vehicle.id === id;
            })[0];
            new VehicleView({
                model: new VehicleModel(vehicle)
            });
        },

        showFleet: function() {
            new FleetView({
                collection: new VehicleCollection(Fuse.FIXTURES.vehicles)
            });
        }
    });
});
