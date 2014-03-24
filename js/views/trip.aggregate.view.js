define([ "fuse", "jquery", "underscore", "models/aggregate.model", "views/trip.aggregate.item.view", "text!templates/tripaggregatetmpl.html" ], function( Fuse, $, _, AggregateModel, TripAggregateItemView, tripAggregateTmpl ) {
    return Fuse.View.extend({
        id: "trips",
        tagName: "div",
        role: "page",
        header: "Trips",
        transition: "slide",
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

            // Build our content.
            this.content = this.template({ aggs: this.aggregates });
            Fuse.View.prototype.render.call( this );
        },

        renderAggregateItem: function( vehicle ) {
            var aggregate = new TripAggregateItemView({
                model: vehicle
            });

            this.aggregates.push( aggregate.render().el );
        }
    });
});
