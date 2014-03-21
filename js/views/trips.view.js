define([ "backbone", "fuse", "jquery", "underscore", "text!templates/tripstmpl.html" ], function( Backbone, Fuse, $, _, tripsTmpl ) {
    // trips view.
    return Fuse.View.extend({
        id: "trips",
        tagName: "div",
        role: "page",
        transiton: "slide",
        tripsTemplate: _.template( tripsTmpl ),

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            this.collection.each(function ( vehicle ) {
            }, this );
        }
    });
});
