define([ "fuse", "jquery", "underscore", "views/trip.aggregate.item.view", "text!templates/tripaggregatetmpl.html" ], function( Fuse, $, _, TripAggregateItemView, tripAggregateTmpl ) {
    return Fuse.View.extend({
        id: "trips",
        tagName: "div",
        role: "page",
        transiton: "slide",
        template: _.template( tripAggregateTmpl ),

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            this.aggregates = [];
        },

        render: function() {
            this.aggregates.length = 0;
            this.collection.each(function ( vehicle ) {
                this.renderAggregateItem( vehicle );
            }, this );
        },

        renderAggregateItem: function( vehicle ) {
            var aggregate = new TripAggregateItemView({
                model: vehicle
            });

            this.aggregates.push( aggregate.render().el );
        }
    });
});
