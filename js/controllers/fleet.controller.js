define([ "fuse", "jquery", "underscore", "collections/fleet.collection", "collections/trip.collection", "models/vehicle.model", "models/aggregate.model", "views/fleet.view", "views/vehicle.view", "views/findcar.view", "views/trips.view", "views/trip.aggregate.view" ], function( Fuse, $, _, FleetCollection, TripCollection, VehicleModel, AggregateModel, FleetView, VehicleView, FindCarView, TripsView, TripAggregateView ) {
    return Fuse.Controller.extend({

        init: function() {
            this.fleet = new FleetCollection( Fuse.FIXTURES.fleet.index );
            this.views = {};
            this.views[ "Fleet" ] = new FleetView({
                controller: this,
                collection: this.fleet
            });
            this.views[ "TripAggregate" ] = new TripAggregateView({
                controller: this,
                model: new AggregateModel( Fuse.FIXTURES.fleet.aggregates.month ),
                collection: this.fleet
            });
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

        showTripAggregate: function() {
            this.views.TripAggregate.render();
        }
    });
});
