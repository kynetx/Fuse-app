define(["fuse", "jquery", "underscore", "collections/fleet.collection", "models/vehicle.model", "views/fleet.view", "views/vehicle.view", "views/findcar.view", "views/trips.view"], function(Fuse, $, _, FleetCollection, VehicleModel, FleetView, VehicleView, FindCarView, TripsView) {
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
            var trips = this.fleet.filterById( arguments[ 0 ] ).trips;

            /**
             * if trips comes back undefined, it means we weren't 
             * passed a valid vehicle id. This can happen either because
             * the vehicle id doesn't exist, the user does not have access
             * to the vehicle, or they did not select a specific vehicle
             * before requesting the trips page. In this case, we just
             * show an aggregate view of their trip data for all their
             * vehicles.
             */ 
            if ( !trips ) {
            }
            // filter the collection down here...
            this.views[ "Trips" ] = new TripsView({
                controller: this,
                collection: new TripCollection( trips )
            });
            this.views.Trips.render();
        }
    });
});
