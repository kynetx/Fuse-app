define([ "backbone", "fuse", "jquery", "underscore", "text!templates/tripstmpl.html" ], function( Backbone, Fuse, $, _, tripsTmpl ) {
    // trips view.
    return Fuse.View.extend({
        id: "trips",
        tagName: "div",
        role: "page",
        transiton: "slide",
        tripsTemplate: _.template( tripsTmpl ),
        tripsHeaderTemplate: _.template( tripsHeaderTmpl ),
        tripItemTemplate: _.template( tripItemTmpl ),

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            this.viewData = [];
            this.tripCollections = [];

            // Are we looking at aggregrate trip data for our fleet or trips for just one vehicle?
            this.header = ( this.collection.length > 1 ) ? "Fleet" : this.collection.at( 0 ).get( "nickname" );
        },

        render: function() {
            this.collection.each(function ( vehicle ) {
                var header = this.tripsHeaderTemplate({ vehicle: vehicle });
            }, this );
        }
    });
});
