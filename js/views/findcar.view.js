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

            // Determine if we are rendering a normal find car view or a trip map.
            if ( !options.trip ) {
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
                // We are rendering a trip map. Buckle up.
                this.map.overlays.push({
                    type: Fuse.map.OverlayTypeId.TRIP,
                    origin: options.trip.get( "startWaypoint" ),
                    destination: options.trip.get( "endWaypoint" ),
                    waypoints: options.trip.get ( "waypoints" )
                });
            }
        },

        render: function() {
            Fuse.View.prototype.render.apply(this, arguments);
        }
    });
});
