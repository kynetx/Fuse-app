define([ "fuse", "jquery", "underscore", "models/aggregate.model", "views/trip.aggregate.item.view", "text!templates/tripaggregatetmpl.html" ], function( Fuse, $, _, AggregateModel, TripAggregateItemView, tripAggregateTmpl ) {
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
            // Build our content.
            // 'this.model' is the sum of all the vehicle aggregates.
            this.content = this.template({ totalAgg: this.model.toJSON(), aggs: this.aggregates });
        },

        renderAggregateItem: function( vehicle ) {
            var aggregate = new TripAggregateItemView({
                model: vehicle
            });

            this.aggregates.push( aggregate.render().el );
        }
    });
});
