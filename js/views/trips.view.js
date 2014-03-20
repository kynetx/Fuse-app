define([ "backbone", "fuse", "jquery", "underscore", "collections/trip.collection", "text!templates/tripstmpl.html" ], function( Backbone, Fuse, $, _, TripCollection, tripsTmpl ) {
    // trips view.
    return Fuse.View.extend({
        id: "trips",
        tagName: "div",
        role: "page",
        transiton: "slide",
        tripsTemplate: _.template( tripsTmpl ),

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            this.viewData = [];
            this.trips = [];
        },

        render: function() {
            this.viewData.length = 0;

            this.collection.each(function( vehicle ) {
                this.buildViewData( vehicle );
            });

            Fuse.View.prototype.render.call( this );
        },

        buildViewData: function( vehicle ) {
            // To be continued...
            _.each( vehicle.get( "trips" ), this.buildTripList);
            var tripView = new TripView({
                model: trip
            });

            this.viewData.push({ vehicle: vehicle.get( "nickname" ), trips: trips });
        },

        buildTripList: function( trip ) {
        }
    });
});
