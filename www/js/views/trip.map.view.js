define([ "fuse", "jquery", "underscore" ], function( Fuse, $, _ ) {
    return Fuse.View.extend({
        tagName: "div",
        id: "trip-map",
        contentClass: "fuse-map-container",
        header: "Trip Map",
        role: "page",
        transition: "flip",

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );

            this.map = {
                container: "#trip-map > .fuse-content",
                overlays: []
            };

            this.map.overlays.push({
                type: Fuse.map.OverlayTypeId.TRIP,
                id: this.model.get( "id" ),
                origin: this.model.get( "startWaypoint" ),
                destination: this.model.get( "endWaypoint" ),
                waypoints: this.model.get ( "waypoints" )
            });
        },

        render: function() {
            Fuse.View.prototype.render.apply( this, arguments );
        }
    });
});
