define(["fuse", "jquery", "underscore", "collections/fleet.collection", "models/vehicle.model", "views/fleet.view", "views/vehicle.view", "views/findcar.view"], function(Fuse, $, _, FleetCollection, VehicleModel, FleetView, VehicleView, FindCarView) {
    return Fuse.Controller.extend({

        init: function() {
            this.fleet = new FleetCollection(Fuse.FIXTURES.vehicles);
        },

        showFleet: function() {
            new FleetView({
                collection: this.fleet
            });
        },

        showVehicle: function(id) {
            // retrieve the model by its id from our fleet collection.
            this.vehicle = this.fleet.get(id);
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
            var collection = (hasId) ? this.fleet.filterById(args[0]) : this.fleet;
            new FindCarView({
                collection: collection
            });
        }
    });
});
