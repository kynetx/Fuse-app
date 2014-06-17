define([ "fuse", "models/trip.model", "vendor/fuse.api" ], function( Fuse, Trip, API ) {
    return Fuse.Collection.extend({
        model: Trip,

        comparator: function( a ) {
            return FTH.formatDate( a.get( "endTime" ) ) * -1;
        },

        /**
         * Get the trips for the last month using some date math
         * and wrap each trip in a model, then fill the collection
         * with the array of models. Since a trips collection will
         * only ever be read from the client and never set from the client,
         * we only handle read operations and throw an error otherwise.
         */
        sync: function( method, model, options ) {

            if ( method !== "read" ) {
                throw "Trips collection should never be set from the client.";
            }

            Fuse.log( "sync!!!!" );
            Fuse.log( model );
            alert( "overriden backbone.sync on trip collection!" );
            options.success();
        }
    });
});
