define([ "fuse", "models/trip.model" ], function( Fuse, Trip ) {
    return Fuse.Collection.extend({
        model: Trip
    });
});
