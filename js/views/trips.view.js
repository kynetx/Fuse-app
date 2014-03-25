define([ "backbone", "fuse", "jquery", "underscore", "views/trip.view", "views/findcar.view", "text!templates/tripstmpl.html" ], function( Backbone, Fuse, $, _, TripView, FindCarView, tripsTmpl ) {
    // trips view.
    return Fuse.View.extend({
        id: "trips",
        tagName: "div",
        role: "page",
        transition: "slide",
        template: _.template( tripsTmpl ),

        events: {
            "tap .fuse-trip-map-trigger": "showMapForTrip"
        },

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
            Fuse.View.prototype.render.call( this );
        },

        renderTrip: function( trip ) {
            var view = new TripView({
                model: trip
            });

            this.tripViews.push( view.render().el );
        },

        /**
         * Utilize a Find Car view to display the trip.
         * Pass the view a typical map configuration object,
         * specifying the needed data in order to render a route
         * between the start and end waypoints of our trip.
         */
        showMapForTrip: function ( e ) {
            // tid = trip id.
            var tid = $( e.target ).closest( ".trip" ).data( "tid" ),
                routeView = new FindCarView({
                    trip: this.model
                });

            routeView.render();

            e.handled = true;
        }
    });
});
