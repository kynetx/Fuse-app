define([ "backbone", "fuse", "jquery", "underscore", "collections/trip.collection" "text!templates/tripstmpl.html" ], function( Backbone, Fuse, $, _, TripCollection, tripsTmpl ) {
    // trips view.
    return Fuse.View.extend({
        id: "trips",
        tagName: "div",
        role: "page",
        transiton: "slide",
        tripsTemplate: _.template( tripsTmpl ),

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            this.trips = [];
        },

        render: function() {
            this.trips.length = 0;

            this.collection.each(function( vehicle ) {
                this.composeTripData( vehicle );
            });

            this.content = this.tripsTemplate({ trips: this.trips });
            Fuse.View.prototype.render.call( this );
        },

        composeTripData: function( vehicle ) {
            // To be continued...
            _.each( vehicle.get( "trips" ), this.composeTripList);
            var tripView = new TripView({
                model: trip
            });

            this.trips.push({ vehicle: vehicle.get( "nickname" ), trips: trips });
        }
    });
});
