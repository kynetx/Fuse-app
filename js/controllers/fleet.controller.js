define(["fuse", "jquery", "underscore", "collections/fleet.collection", "collections/trip.collection", "models/vehicle.model", "views/fleet.view", "views/vehicle.view", "views/findcar.view", "views/trips.view"], function(Fuse, $, _, FleetCollection, TripCollection, VehicleModel, FleetView, VehicleView, FindCarView, TripsView) {
    return Fuse.Controller.extend({

        init: function() {
            this.fleet = new FleetCollection( Fuse.FIXTURES.fleet );
            this.views = {};
            this.views[ "Fleet" ] = new FleetView({
                controller: this,
                collection: this.fleet
            })
        },

        showFleet: function() {
            this.views.Fleet.render();
        },

        showVehicle: function() {
            // retrieve the model by its id from our fleet collection.
            this.vehicle = this.fleet.get( arguments[ 0 ] );
            if ( !this.vehicle ) {
                Fuse.log( "No such vehicle. Aborting." );
                return;
            }
            this.views[ "Vehicle" ] = new VehicleView({
                controller: this,
                model: this.vehicle
            });
            this.views.Vehicle.render();
        },

        showFindCar: function() {
            this.views[ "FindCar" ] = new FindCarView({
                controller: this,
                collection: this.fleet.filterById( arguments[ 0 ] )
            });
            this.views.FindCar.render();
        },

        showTrips: function() {
            this.views[ "Trips" ] = new TripsView({
                controller: this,
                collection: new TripCollection(Fuse.FIXTURES.trips)
            });
            this.views.Trips.render();
        }
    });
});
