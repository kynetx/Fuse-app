define([ "fuse", "jquery", "underscore", "models/aggregate.model", "views/trip.aggregate.item.view", "text!templates/tripaggregatetmpl.html" ], function( Fuse, $, _, AggregateModel, TripAggregateItemView, tripAggregateTmpl ) {
    return Fuse.View.extend({
        id: "trips",
        tagName: "div",
        role: "page",
        header: "Trips",
        transition: "slide",
        template: _.template( tripAggregateTmpl ),

        events: {
            "tap .trip-aggregate-item"  : "showTripsForVehicle",
            "tap #export-trips"         : "exportTrips"
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            this.aggregates = [];
        },

        render: function() {
            this.aggregates.length = 0;
            this.collection.each(function( summary ) {
                this.renderAggregateItem( summary );
            }, this );

            // Build our content.

            // Calculate total aggregates...
            this.total = this.collection.map(function(summary) {
                return summary.pick('cost', 'mileage', 'trip_count');
            }).reduce(function(memo, current) {
                return {
                    cost: memo.cost + Number(current.cost),
                    mileage: memo.mileage + Number(current.mileage),
                    trip_count: memo.trip_count + Number(current.trip_count)
                };
            }, {cost: 0, mileage: 0, trip_count: 0}
            );            
            this.content = this.template({ total: this.total, aggs: this.aggregates });
            Fuse.View.prototype.render.call( this );
        },

        renderAggregateItem: function( summary ) {
            var s = new TripAggregateItemView({
                model: summary
            });

            this.aggregates.push( s.render().el );
        },

        showTripsForVehicle: function( e ) {
            var vid = $( e.target ).closest( ".trip-aggregate-item" ).data( "vid" );
            Fuse.show( "trips", { id: vid } );
            e.handled = true;
        },
        
        exportTrips: function( e ) {
            // Somewhat of a stub...
            // Make trip export call to API, passing a date range.
            setTimeout(function() {
                alert( "Trip data export is currently being generated and will be emailed to you when finished.");
            }, 250 );

            e.handled = true;
        }
    });
});
