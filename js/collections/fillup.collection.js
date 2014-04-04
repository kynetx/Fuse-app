define([ "fuse", "models/fillup.model" ], function( Fuse, Fillup ) {
    return Fuse.Collection.extend({
        model: Fillup
    });
});
