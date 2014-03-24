define([ "backbone", "fuse", "jquery", "underscore", "text!templates/tripstmpl.html" ], function( Backbone, Fuse, $, _, tripsTmpl ) {
    // trips view.
    return Fuse.View.extend({
        id: "trips",
        tagName: "div",
        role: "page",
        transiton: "slide",
        template: _.template( tripsTmpl ),

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            this.tripViews = [];
        },

        render: function() {
            this.tripViews.length = 0;
            this.collection.each(function ( trip ) {
                this.renderTrip( trip );
            }, this );

            this.content = this.template({ vehicle: this.model.toJSON(), tripViews: this.tripViews })
        },

        renderTrip: function( trip ) {
        }
    });
});
