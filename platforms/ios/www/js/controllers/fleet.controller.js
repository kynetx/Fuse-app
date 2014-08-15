define([ "fuse", "jquery", "underscore", "collections/fleet.collection", "collections/trip.collection", "collections/fillup.collection", "collections/aggregate.collection", "models/fillup.model", "models/vehicle.model", "models/aggregate.model", "views/loading.view", "views/fleet.view", "views/vehicle.view", "views/findcar.view", "views/trips.view", "views/trip.aggregate.view", "views/trip.detail.view", "views/fuel.view", "views/fuel.aggregate.view", "views/maintenance.splash.view", "views/maintenance.alerts.view", "views/maintenance.reminders.view", "views/maintenance.history.view" ], function( Fuse, $, _, FleetCollection, TripCollection, FillupCollection, AggregateCollection, FillupModel, VehicleModel, AggregateModel, LoadingView, FleetView, VehicleView, FindCarView, TripsView, TripAggregateView, TripDetailView, FuelView, FuelAggregateView, MaintenanceSplashView, MaintenanceAlertsView, MaintenanceRemindersView, MaintenanceHistoryView ) {
    return Fuse.Controller.extend({

        init: function() {
            this.fleet = new FleetCollection();

            this.summaries = {
                fuel: new AggregateCollection([], {type: 'fuel'}),
                trip: new AggregateCollection([], {type: 'trip'})
            };

            this.trips = {};
            this.fillups = {};
            
            this.views = {};

            this.views[ "Loading" ] = new LoadingView({
                controller: this
            });

            this.views[ "Fleet" ] = new FleetView({
                controller: this,
                collection: this.fleet
            });

            this.views[ "TripAggregate" ] = new TripAggregateView({
                controller: this,
                collection: this.summaries.trip
            });

            this.views[ "FuelAggregate" ] = new FuelAggregateView({
                controller: this,
                collection: this.summaries.fuel
            });

            this.views[ "MaintenanceSplash" ] = new MaintenanceSplashView({
                controller: this
            });

            this.views[ "MaintenanceAlerts" ] = new MaintenanceAlertsView({
                controller: this
            });

            this.views[ "MaintenanceReminders" ] = new MaintenanceRemindersView({
                controller: this
            });

            this.views[ "MaintenanceHistory" ] = new MaintenanceHistoryView({
                controller: this
            });
        },
        
        showFleet: function() {
            var __self__ = this;

            if ( this.fleet.length ) {
                this.views.Fleet.render();
                return;
            }
            
            this.views.Loading.render('fetching fleet details...');

            this.fleet.fetch({
                
                success: function() {
                    __self__.views.Fleet.render();
                },

                error: function() {
                    alert( "Can't grab fleet details. Try again. If the problem persists please contact us." );
                }

            });
        },

        showVehicle: function() {
            // retrieve the model by its id from our fleet collection.
            var id = arguments[ 0 ];
            this.vehicle = this.fleet.find(function( v ) { return v.get( "picoId" ) === id; });
            Fuse.log( this.vehicle );
            
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
            var __self__ = this;

            if (this.summaries.trip.length) {
                this.views.TripAggregate.render();
                return;
            }

            this.summaries.trip.fetch({

                success: function() {
                    if (!__self__.summaries.trip.length) {
                        // If we didnt get back any summaries then we'll just use
                        // the fleet summary
                        Fuse.log('No trip summaries, using fleet collection.');
                        __self__.summaries.trip.reset(__self__.fleet.models);
                    }
                    __self__.views.TripAggregate.render();
                },

                error: function() {

                }
            });
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

            this.trips[id] = this.trips[id] || new TripCollection();

            this.views[ "Trips" ] = new TripsView({
                controller: this,
                model: this.fleet.find(function( v ) { return v.get( "picoId" ) === id; }),
                collection: this.trips[id]
            });
            
            try {

                var __self__ = this;

                Fuse.currentTripContext = __self__.views.Trips.model.get('channel');

                if ( this.trips[id].length ) {
                    this.views.Trips.render();
                    return;
                }

                this.trips[id].fetch({

                    success: function( trips ) {
                        __self__.views.Trips.render();
                    },

                    error: function( error ) {
                        alert( "Fatal error while trying to retrieve trips from the API!" );
                        throw "Fatal Error";
                    }
                });

            } catch( e ) {
                Fuse.log( e );
                this.views.Fleet.render();
                alert( "An error occured while retrieving trips: " + e );
            }
        },

        showTrip: function( id ) {
            var trip = this.trips[this.views.Trips.model.get('picoId')].get( id )
            this.views[ "Trip" ] = new TripDetailView({
                controller: this,
                model: trip
            });

            try {

                var __self__ = this;

                // If the trip model has a datum attribute, it means
                // we've already fetched the trip via the API and don't
                // need to bother with it again.
                if (trip.get('datum')) {
                    this.views.Trip.render();
                    return;
                }

                // Otherwise let's fetch this thing!
                trip.fetch({

                    success: function(trip) {
                        debugger;
                        console.log(trip);
                    },

                    error: function(error) {
                        alert('Fatal error while trying to retrieve trip from the API!');
                        throw 'Fatal Error';
                    }
                });

            } catch(e) {
                Fuse.log(e);
                this.views.Fleet.render();
                alert('An error occured while retrieving the trip: ' + e);
            }
        },

        showFuelAggregate: function() {
            var __self__ = this;

            if (this.summaries.fuel.length) {
                this.views.FuelAggregate.render();
                return;
            }

            this.summaries.fuel.fetch({
                
                success: function( summary ) {
                    if (!__self__.summaries.fuel.length) {
                        // If we didnt get back any summaries then we'll just use
                        // the fleet summary
                        Fuse.log('No fuel summaries, using fleet collection.');
                        __self__.summaries.fuel.reset(__self__.fleet.models);
                    }
                    __self__.views.FuelAggregate.render();
                },

                error: function() {

                }
            });
        },

        showFuel: function( id ) {
            /**
             * Make sure that the vehicle for whom we are requesting the fuel view
             * has a valid fillups value. If not, initialize it. Also set 'currentFillups'
             * so that 'addFillups' can access the fillups for the current vehicle.
             * Note: We may want to sanity check our data modeling here.
             */
            this.fillups[ id ] = this.fillups[ id ] || new FillupCollection();
            this.currentFillups = this.fillups[ id ];
            this.views[ "Fuel" ] = new FuelView({
                controller: this
            });

            try {
                
                var __self__ = this;

                Fuse.currentFuelContext = __self__.fleet.find(function( v ) { return v.get( "picoId" ) === id; }).get('channel');

                if ( this.currentFillups.length && this.summaries.fuel.length) {
                    this.views.Fuel.model = this.summaries.fuel.find(function( v ) { return v.get( "picoId" ) === id; }),
                    this.views.Fuel.render();
                    return;
                }

                this.currentFillups.fetch({

                    fuelECI: Fuse.currentFuelContext,
                    
                    success: function( fillups ) {

                        if (!__self__.summaries.fuel.length) {

                            __self__.summaries.fuel.fetch({
                                
                                success: function() {
                                    if (!__self__.summaries.fuel.length) {
                                        // If we didnt get back any summaries then we'll just use
                                        // the fleet summary
                                        Fuse.log('No fuel summaries, using fleet collection.');
                                        __self__.summaries.fuel.reset(__self__.fleet.models);
                                    }

                                    __self__.views.Fuel.model = __self__.summaries.fuel.find(function( v ) { return v.get( "picoId" ) === id; });
                                    __self__.views.Fuel.render();
                                },

                                error: function() {

                                }
                            });

                        } else {
                            __self__.views.Fuel.model = __self__.summaries.fuel.find(function( v ) { return v.get( "picoId" ) === id; }),
                            __self__.views.Fuel.render();
                        }
                    },

                    error: function( error ) {
                        alert( "Fatal error while trying to retrieve fillups from the API!" );
                        throw "Fatal Error";
                    }
                });

            } catch( e ) {
                Fuse.log( e );
                this.views.Fleet.render();
                alert( "An error occured while retrieving fillups: " + e );
            }
        },

        /**
         * Construct a FillupModel and add it to our FillupCollection.
         * @param numGallons  -  number of gallons filled.
         * @param priceGallon -  price per gallon.
         * @param cost        -  total cost of fillup.
         * @param odometer    -  vehicle odometer reading at time of fillup.
         * @param gasStation  -  gas station where fillup occurred.
         */
        addFillup: function( numGallons, priceGallon, cost, odometer, gasStation ) {
            var fillup = this.currentFillups.create({
                numGallons  : numGallons,
                priceGallon : priceGallon,
                cost        : cost,
                odometer    : odometer,
                gasStation  : gasStation
            });
            Fuse.log("Added fillup:", fillup, "to fillup collection:", this.currentFillups );
        },

        // Render the maintenance splash view.
        showMaintenanceSplash: function() {
            this.views.MaintenanceSplash.render();
        },

        showMaintenanceSplashForVehicle: function( id ) {
            this.views[ "VehicleMaintenanceSplash" ] = new MaintenanceSplashView({
                controller: this,
                model: this.fleet.get( id )
            });
            this.views.VehicleMaintenanceSplash.render();
        },

        showMaintenanceAlerts: function() {
            this.views.MaintenanceAlerts.render();
        },

        showMaintenanceAlertsForVehicle: function( id ) {
            this.views[ "VehicleMaintenanceAlerts" ] = new MaintenanceAlertsView({
                controller: this,
                model: this.fleet.get( id )
            });
            this.views.VehicleMaintenanceAlerts.render();
        },

        showMaintenanceReminders: function() {
            this.views.MaintenanceReminders.render();
        },

        showMaintenanceRemindersForVehicle: function( id ) {
            this.views[ "VehicleMaintenanceReminders" ] = new MaintenanceRemindersView({
                controller: this,
                model: this.fleet.get( id )
            });

            this.views.VehicleMaintenanceReminders.render();
        },

        showMaintenanceHistory: function() {
            this.views.MaintenanceHistory.render();
        },

        showMaintenanceHistoryForVehicle: function( id ) {
            this.views[ "VehicleMaintenanceHistory" ] = new MaintenanceHistoryView({
                controller: this,
                model: this.fleet.get( id )
            });

            this.views.VehicleMaintenanceHistory.render();
        }
    });
});
