define([ "backbone", "fuse", "jquery", "underscore" ], function( Backbone, Fuse, $, _ ) {
    // trips view.
    return Fuse.View.extend({
        id: "trips",
        tagName: "div",
        role: "page",
        header: "Trips",
        transiton: "slide",
        tripsTemplate: _.template( tripsTmpl ),

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        }
    });
});
