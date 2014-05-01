define([ "fuse", "jquery", "underscore", "text!templates/tripdetailtmpl.html" ], function( Fuse, $, _, tripDetailTmpl ) {
    return Fuse.View.extend({
        tagName: "div",
        id: "trip-detail",
        header: "Trip Detail",
        role: "page",
        transition: "slide",
        template: _.template( tripDetailTmpl ),

        initialize: function( options ) {
            Fuse.View.prototype.initialize.apply( this, arguments );

            this.map = {
                container: "#trip-map",
                overlays: []
            };
            
            this.map.overlays.push({
                type            : Fuse.map.OverlayTypeId.TRIP,
                id              : this.model.get( "id" ),
                origin          : this.model.get( "startWaypoint" ),
                destination     : this.model.get( "endWaypoint" )
            });
        },
        
        render: function() {
            this.content = this.template({ data: this.model.toJSON() });
            Fuse.View.prototype.render.call( this );
        }
    });
});
