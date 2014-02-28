define(["fuse", "jquery", "underscore", "collections/vehicles.collection", "models/vehicle.model", "views/vehicles.view", "views/vehicle.view"], function(Fuse, $, _, VehicleCollection, VehicleModel, VehiclesView, VehicleView) {
    return Fuse.Controller.extend({
        showVehicleList: function() {
            Fuse.log("Vehicles controller: rendering vehicle list view.");
            Fuse.log(Fuse.data.vehicles);
            new VehiclesView({
                collection: new VehicleCollection(Fuse.data.vehicles)
            });
        },

        showVehicleDetail: function(id) {
            Fuse.log("Vehicles controller: rendering view for vehicle:", id);
            var vehicle = Fuse.data.vehicles.filter(function(vehicle) {
                return vehicle.id === id;
            })[0];
            Fuse.log("Found vehicle:", vehicle);
            new VehicleView({
                model: new VehicleModel(vehicle)
            });
        }
    });
});
