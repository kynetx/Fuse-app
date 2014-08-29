define([ "fuse", "jquery", "underscore", "models/aggregate.model", "views/fuel.aggregate.item.view", "text!templates/fuelaggregatetmpl.html" ], function( Fuse, $, _, AggregateModel, FuelAggregateItemView, fuelAggregateTmpl ) {
    return Fuse.View.extend({
        id: "fuel-aggregate",
        tagName: "div",
        role: "page",
        header: "Fuel",
        transition: "slide",
        template: _.template( fuelAggregateTmpl ),

        events: {
            "tap .fuel-aggregate-item": "showFuelForVehicle"
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            this.aggregates = [];
        },

        render: function() {
            this.aggregates.length = 0;
            this.collection.each(function ( summary ) {
                this.renderAggregateItem( summary );
            }, this );

            // Build our content.

            // We have to calculate fleet totals on our own.
            this.total = this.collection.map(function(summary) {
                return summary.pick('cost', 'distance', 'fillups', 'volume');
            }).reduce(function(memo, current) {
                return {
                    cost: memo.cost + ((typeof current.cost !== "undefined" && current.cost) ? Number(current.cost) : 0),
                    distance: memo.distance + ((typeof current.distance !== "undefined" && current.distance) ? Number(current.distance) : 0),
                    fillups: memo.fillups +  ((typeof current.fillups !== "undefined" && current.fillups) ? Number(current.fillups) : 0),
                    volume: memo.volume +  ((typeof current.volume !== "undefined" && current.volume) ? Number(current.volume) : 0)
                };
            },
            {
		cost: 0,
                distance: 0, 
                fillups: 0, 
                volume: 0
            }
           );

            this.content = this.template({ total: this.total, aggs: this.aggregates });
            Fuse.View.prototype.render.call( this );
        },

        // This isnt going to work now.
        renderAggregateItem: function( summary ) {
            var s = new FuelAggregateItemView({
                model: summary
            });

            this.aggregates.push( s.render().el );
        },

        showFuelForVehicle: function( e ) {
            var vid = $( e.target ).closest( ".fuel-aggregate-item" ).data( "vid" );
            Fuse.show( "fuel", { id: vid } );
            e.handled = true;
        }
    });
});
