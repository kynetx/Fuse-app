define([ "fuse", "models/trip.model", "vendor/fuse.api" ], function( Fuse, Trip, API ) {
    return Fuse.Collection.extend({
        model: Trip,

        url: Fuse.BASE_API_URI + "trips?_eci=" + localStorage.getItem( "com.kynetx.fuse.ECI" ),

        comparator: function( a ) {
            return FTH.formatDate( a.get( "endTime" ) ) * -1;
        },
        
        sync: function( method, model, options ) {
            Fuse.log( "sync!!!!" );
            options.success();
        }
    });
});
