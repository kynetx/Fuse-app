define([ "fuse", "jquery", "underscore", "collections/fleet.collection", "collections/trip.collection", "collections/fillup.collection", "models/fillup.model", "models/vehicle.model", "models/aggregate.model", "views/fleet.view", "views/vehicle.view", "views/findcar.view", "views/trips.view", "views/trip.aggregate.view", "views/fuel.view", "views/fuel.aggregate.view" ], function( Fuse, $, _, FleetCollection, TripCollection, FillupCollection, FillupModel, VehicleModel, AggregateModel, FleetView, VehicleView, FindCarView, TripsView, TripAggregateView, FuelView, FuelAggregateView ) {
    return Fuse.Controller.extend({

        init: function() {
            this.fleet = new FleetCollection( Fuse.FIXTURES.fleet.index );
            this.totals = new AggregateModel( Fuse.FIXTURES.fleet.aggregates.total )
            this.trips = new TripCollection( Fuse.FIXTURES.trips );
            this.fillups = {};
            this.views = {};
            this.views[ "Fleet" ] = new FleetView({
                controller: this,
                collection: this.fleet
            });
            this.views[ "TripAggregate" ] = new TripAggregateView({
                controller: this,
                model: this.totals,
                collection: this.fleet
            });
            this.views[ "FuelAggregate" ] = new FuelAggregateView({
                controller: this,
                model: this.totals,
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
        },

        showTrips: function( id ) {
            /**
             * Here we will make a /trips request to the
             * api and recieve our TripCollection. For now
             * we are operating off of fixtures, so we simply
             * take our trips fixture and make a TripCollection
             * out of it.
             *
             * In order to render a Trips view, we also need to know some
             * basic info about the vehicle itself, so we pass that in as the model.
             *
             * The request might be as simple as TripCollection.fetch({ data: id }) as long
             * as we've structured the collection correctly. So in the initialize
             * function we could instantiate a new TripCollection:
             * this.trips = new TripCollection();
             * and then in showTrips (right here):
             * this.trips.fetch({ data: id }).
             *
             * We might also want to consider storing the last trip taken by the vehicle in
             * the fleet index so that we can show the trips view immediately and then lazy load
             * the next N trips in the background so that delays are minimal.
             */
            this.views[ "Trips" ] = new TripsView({
                controller: this,
                model: this.fleet.get( id ),
                collection: this.trips
            });

            this.views.Trips.render();
        },

        showFuelAggregate: function() {
            this.views.FuelAggregate.render();
        },

        showFuel: function( id ) {
            /**
             * Make sure that the vehicle for whom we are requesting the fuel view
             * has a valid fillups value. If not, initialize it. Also set 'currentFillups'
             * so that 'addFillups' can access the fillups for the current vehicle.
             * Note: We may want to sanity check our data modeling here.
             */
            this.fillups[ id ] = this.fillups[ id ] || new FillupCollection( [] );
            this.currentFillups = this.fillups[ id ];
            this.views[ "Fuel" ] = new FuelView({
                controller: this,
                model: this.fleet.get( id )
            });
            this.views.Fuel.render();
        },

        /**
         * Construct a FillupModel and add it to our FillupCollection.
         * @param numGallons  -  number of gallons filled.
         * @param priceGallon -  price per gallon.
         * @param odometer    -  vehicle odometer reading at time of fillup.
         * @param gasStation  -  gas station where fillup occurred.
         */
        addFillup: function( numGallons, priceGallon, odometer, gasStation ) {
            var fillup = new FillupModel({
                numGallons:  numGallons,
                priceGallon: priceGallon,
                odometer:    odometer,
                gasStation:  gasStation
            });

            this.currentFillups.add( fillup );
            Fuse.log("Added fillup:", fillup, "to fillup collection:", this.currentFillups );
        }
    });
});
