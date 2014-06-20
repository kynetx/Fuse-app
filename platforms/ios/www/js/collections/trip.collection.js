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

                    // Compute the timestamps for month to date.
                    var now = new Date(), monthStart = new Date( now.getFullYear(), now.getMonth() );

                    // Grab the trips.
                    API.trips( localStorage.getItem( "com.kynetx.fuse.ECI" ), monthStart.toISOString(), now.toISOString(), function( response ) {
                        Fuse.log( response );
                        debugger;
                        if ( typeof response.error === "undefined" ) {
                            options.success( response );
                        } else {
                            options.error( response );
                        }
                    });

                    break;
                default:
                    options.error( "API method not yet implemented." );
            }
        }
    });
});
