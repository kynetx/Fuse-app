define(["fuse", "jquery", "underscore", "collections/fleet.collection", "models/vehicle.model", "views/fleet.view", "views/vehicle.view", "views/findcar.view", "views/fuel.view"], function(Fuse, $, _, FleetCollection, VehicleModel, FleetView, VehicleView, FindCarView, FuelSmartView) {
    return Fuse.Controller.extend({

        init: function() {
            this.fleet = new FleetCollection(Fuse.FIXTURES.fleet);
            this.views = {};
            this.views["Fleet"] = new FleetView({
                controller: this,
                collection: this.fleet
            });
            this.views["FuelSmart"] = new FuelSmartView({
                controller: this,
                collection: this.fleet
            })
        },

        showFleet: function() {
            this.views.Fleet.render();
        },

        showVehicle: function(id) {
            // retrieve the model by its id from our fleet collection.
            this.vehicle = this.fleet.get(id);
            this.views["Vehicle"] = new VehicleView({
                controller: this,
                model: this.vehicle
            });
            this.views.Vehicle.render();
        },

        showFuelSmart: function(id) {
            // retrieve the model by its id from our fleet collection.
            this.vehicle = this.fleet.get(id);
            this.views["FuelSmart"] = new FuelSmartView({
                controller: this,
                model: this.vehicle
            });
            this.views.FuelSmart.render();
        },

        showFindCar: function() {
            var args = arguments;
            var hasId = typeof args[0] !== "undefined";
            // if we were passed a vehicle id, 
            // filter our vehicles collection down to just
            // the vehicle with that id, otherwise show 
            // the findcar view for all vehicles.
            var collection = (hasId) ? this.fleet.filterById(args[0]) : this.fleet;
            this.views["FindCar"] = new FindCarView({
                controller: this,
                collection: collection
            });
            this.views.FindCar.render();
        }
    });
});
