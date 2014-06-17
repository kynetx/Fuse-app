define([ "fuse", "models/trip.model", "vendor/fuse.api" ], function( Fuse, Trip, API ) {
    return Fuse.Collection.extend({
        model: Trip,

        // use the api here.

        url: Fuse.BASE_API_URI + "trips?_eci=" + localStorage.getItem( "com.kynetx.fuse.ECI" ),

        comparator: function( a ) {
            return FTH.formatDate( a.get( "endTime" ) ) * -1;
        },

        // switch on multiple api methods.
        sync: function( method, model, options ) {
            Fuse.log( "sync!!!!" );
        }
    });
});
