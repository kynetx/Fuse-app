define([ "fuse", "jquery", "underscore", "text!templates/maintenancealertstmpl.html" ], function( Fuse, $, _, maintenanceAlertsTmpl ) {
    return Fuse.View.extend({
        id: "maintenance-alerts",
        tagName: "div",
        role: "page",
        header: "Fleet Alerts",
        transition: "slide",
        template: _.template( maintenanceAlertsTmpl ),
        
        events: {
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            if ( this.model ) {
                this.header = this.model.get( "nickname" ) + " Alerts";
            }
        },

        render: function() {
            // Are we rendering alerts for the whole fleet or just one vehicle?
            if ( this.model ) {
                // Just one vehicle.
            } else {
                // The whole fleet.
            }
            Fuse.View.prototype.render.call( this );
        }

    });
});
