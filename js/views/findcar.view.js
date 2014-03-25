define([ "fuse", "jquery", "underscore" ], function( Fuse, $, _ ) {
    return Fuse.View.extend({
        tagName: "div",
        id: "find-car",
        contentClass: "fuse-map-container",
        role: "page",
        transition: "flip",

        initialize: function( options ) {
            Fuse.View.prototype.initialize.apply( this, arguments );

            this.map = {
                container: "#find-car > .fuse-content"
            };

            this.map.overlays = [];

            // Determine if we will be rendering a normal find car view or a trip map.
            if ( !options.trip ) {
                this.header = "Find Car";
                this.collection.each(function(vehicle, idx) {
                    var icon = "../../style/images/car_map_icon_"+ idx % 3 +".png";
                    this.map.overlays.push({
                        icon: icon,
                        type: Fuse.map.OverlayTypeId.MARKER,
                        position: vehicle.get("lastWaypoint"),
                        title: vehicle.get("nickname"),
                        animation: "drop",
                        route: "click"
                    });
                }, this);
            } else {
                // We will be rendering a trip map. Buckle up.
                this.header = "Trip Map";
                this.map.overlays.push({
                    type: Fuse.map.OverlayTypeId.TRIP,
                    id: options.trip.get( "id" ),
                    origin: options.trip.get( "startWaypoint" ),
                    destination: options.trip.get( "endWaypoint" ),
                    waypoints: options.trip.get ( "waypoints" )
                });
            }
        },

        render: function() {
            Fuse.View.prototype.render.apply( this, arguments );
        }
    });
});
