define(["fuse", "jquery", "underscore", "collections/vehicles.collection", "models/vehicle.model", "views/vehicles.view", "views/vehicle.view", "views/findcar.view"], function(Fuse, $, _, VehicleCollection, VehicleModel, VehiclesView, VehicleView, FindCarView) {
    return Fuse.Controller.extend({

        init: function() {
            this.vehicles = new VehicleCollection(Fuse.FIXTURES.vehicles);
        },

        showVehicleList: function() {
            new VehiclesView({
                collection: this.vehicles
            });
        },

        showVehicleDetail: function(id) {
            // retrieve the model by its id from our vehicles collection.
            this.vehicle = this.vehicles.get(id);
            new VehicleView({
                model: this.vehicle
            });
        },

        showFindCar: function() {
            var args = arguments;
            var hasId = typeof args[0] !== "undefined";
            // if we were passed a vehicle id, 
            // filter our vehicles collection down to just
            // the vehicle with that id, otherwise show 
            // the findcar view for all vehicles.
            var collection = (hasId) ? this.vehicles.filterById(args[0]) : this.vehicles;
            new FindCarView({
                collection: collection
            });
        }
    });
});
