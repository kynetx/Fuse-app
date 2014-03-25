define([ "backbone", "fuse", "jquery", "underscore", "views/trip.view", "text!templates/tripstmpl.html" ], function( Backbone, Fuse, $, _, TripView, tripsTmpl ) {
    // trips view.
    return Fuse.View.extend({
        id: "trips",
        tagName: "div",
        role: "page",
        transition: "slide",
        template: _.template( tripsTmpl ),

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            this.header = this.model.get( "nickname" ) + " " + "Trips";
            this.tripViews = [];
        },

        render: function() {
            this.tripViews.length = 0;
            this.collection.each(function ( trip ) {
                this.renderTrip( trip );
            }, this );

            this.content = this.template({ vehicle: this.model.toJSON(), tripViews: this.tripViews });
            Fuse.log( this.tripViews );
            Fuse.View.prototype.render.call( this );
        },

        renderTrip: function( trip ) {
            var view = new TripView({
                model: trip
            });

            this.tripViews.push( view.render().el );
        }
    });
});
