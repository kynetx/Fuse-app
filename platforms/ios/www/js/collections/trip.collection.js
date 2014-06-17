define([ "fuse", "models/trip.model", "vendor/fuse.api" ], function( Fuse, Trip, API ) {
    return Fuse.Collection.extend({
        model: Trip,

        comparator: function( a ) {
            return FTH.formatDate( a.get( "endTime" ) ) * -1;
        },

        sync: function( method, model, options ) {
            Fuse.log( "sync!!!!" );
            Fuse.log( model );
            options.success();
        }
    });
});
