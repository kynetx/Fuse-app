define([ "fuse", "models/trip.model", "vendor/fuse.api" ], function( Fuse, Trip, API ) {
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
            if ( method === "read" ) {
                // Fetch all the trips ( month to date )

                // Compute the timestamps for month to date.
                var now = new Date(), monthStart = new Date( now.getFullYear(), now.getMonth() );
                Fuse.log( "Now:", now, "monthStart:", monthStart );
            }
        }
    });
});
