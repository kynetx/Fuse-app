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
            this.collection.each(function ( vehicle ) {
                this.renderAggregateItem( vehicle );
            }, this );

            // Build our content.
            this.content = this.template({ totals: this.model.toJSON(), aggs: this.aggregates });
            Fuse.View.prototype.render.call( this );
        },

        renderAggregateItem: function( vehicle ) {
            var aggregate = new FuelAggregateItemView({
                model: vehicle
            });

            this.aggregates.push( aggregate.render().el );
        },

        showFuelForVehicle: function( e ) {
            var vid = $( e.target ).closest( ".fuel-aggregate-item" ).data( "vid" );
            Fuse.show( "fuel", { id: vid } );
            e.handled = true;
        }
    });
});
