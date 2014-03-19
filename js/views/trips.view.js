define([ "backbone", "fuse", "jquery", "underscore", "text!templates/tripstmpl.html" ], function( Backbone, Fuse, $, _, tripsTmpl ) {
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
