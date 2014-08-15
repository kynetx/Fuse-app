define([ "fuse", "models/trip.model", "fuseapi" ], function( Fuse, Trip, API ) {
    return Fuse.Collection.extend({
        model: Trip,

        comparator: function( a ) {
            return FTH.formatDate( a.get( "endTime" ) ) * -1;
        },

        /**
         * Get the trips for the last month using some date math
         * and wrap each trip in a model, then fill the collection
         * with the array of models.
         */
        sync: function( method, model, options ) {
            switch( method ) {
                case "read":
                    // Fetch all the trips ( month to date ).
                    Fuse.loading( "show", "Fetching trips for the past month..." );

                    // Compute the timestamps for month to date.
                    var now = new Date(), monthStart = new Date( now.getFullYear(), now.getMonth() );

                    var __self__ = this;

                    // Grab the trips.
                    API.tripsByDate(

                        Fuse.currentTripContext,
                        
                        monthStart.toISOString(), 

                        now.toISOString(), 

                        function( response ) {
                            Fuse.loading( "hide" );
                            if ( typeof response.skyCloudError === "undefined" ) {
                                options.success( response );
                            } else {
                                options.error( response );
                            }
                        },

                        {
                            force: true 
                        }
                    );

                    break;
                default:
                    options.error( "API method not yet implemented." );
                    break;
            }
        }
    });
});
