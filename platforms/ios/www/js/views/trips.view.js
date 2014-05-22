define([ "backbone", "fuse", "jquery", "underscore", "views/trip.view", "views/findcar.view", "views/trip.map.view", "text!templates/tripstmpl.html" ], function( Backbone, Fuse, $, _, TripView, FindCarView, TripMapView, tripsTmpl ) {
    return Fuse.View.extend({
        id: "trips",
        tagName: "div",
        role: "page",
        transition: "slide",
        template: _.template( tripsTmpl ),

        events: {
            "tap .fuse-trip-map-trigger"    : "showMapForTrip",
            "tap .collapsible-day"          : "toggleCollapse",
            "tap .trip a"                   : "showTripDetail"
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            this.header = this.model.get( "nickname" ) + " " + "Trips";
            this.tripViewData = [];

            // sort our trips collection using our pre-defined comparator.
            this.collection.sort();
        },

        render: function() {
            this.collection.each(function( trip ) {
                this.addTrip( trip );
            }, this );
            
            this.content = this.template({ vehicle: this.model.toJSON(), tripViewData: this.tripViewData });
            Fuse.View.prototype.render.call( this );

            $( ".collapsible:first" ).collapsible( "expand" );
        },

        renderTrip: function( trip ) {
            var view = new TripView({
                model: trip
            });

            this.tripViews.push( view.render().el );
        },

        addTrip: function( trip ) {
            var date        = FTH.formatDate( trip.get( "endTime" ) ),
                time        = date.getTime(),
                day         = date.getDate(),
                duration    = FTH.formatDate( trip.get( "endTime" ) ) - FTH.formatDate( trip.get( "startTime" ) ); 
                view        = new TripView({
                    model: trip
                }),
                tripIdx     = this.tripViewData.map(function( t ) { return t.day; }).indexOf( day );
            
            if ( tripIdx < 0 ) {
                var newLength = this.tripViewData.push({
                    elements    : [], 
                    aggregates  : {
                        duration    : 0,
                        distance    : 0,
                        cost        : 0
                    }, 
                    day         : day, 
                    timestamp   : time,
                });

                tripIdx = newLength - 1;
            }

            this.tripViewData[ tripIdx ][ "elements" ].unshift( view.render().el );
            
            this.tripViewData[ tripIdx ][ "aggregates" ][ "duration" ]  += duration;
            this.tripViewData[ tripIdx ][ "aggregates" ][ "distance" ]  += trip.get( "mileage" );
            this.tripViewData[ tripIdx ][ "aggregates" ][ "cost" ]      += trip.get( "cost" );
        },

        /**
         * Utilize a Trip Map view to display the trip.
         * Pass the view a typical map configuration object,
         * specifying the needed data in order to render a route
         * between the start and end waypoints of our trip.
         */
        showMapForTrip: function ( e ) {
            // tid = trip id.
            var tid = $( e.target ).closest( ".trip" ).data( "tid" ),
                routeView = new TripMapView({
                    model: this.collection.get( tid )
                });

            routeView.render();

            e.handled = true;
        },

        toggleCollapse: function ( e ) {
            var target = $( e.target ).parent().next().children();
            var collapsed = target.collapsible( "option", "collapsed" );

            if ( collapsed ) {
                target.collapsible( 'expand' );
            } else {
                target.collapsible( 'collapse' );
            }

            e.handled = true;
        },

        showTripDetail: function( e ) {
            var tripID = $( e.target ).closest( "ul" ).data( "tid" );
            Fuse.show( "trip", { id: tripID } );

            e.handled = true;
        }
    });
});
