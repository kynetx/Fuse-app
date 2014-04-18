define([ "fuse", "jquery", "underscore", "text!templates/maintenancealertstmpl.html" ], function( Fuse, $, _, maintenanceAlertsTmpl ) {
    return Fuse.View.extend({
        id: "maintenance-alerts",
        tagName: "div",
        role: "page",
        header: "Maintenance Alerts",
        transition: "slide",
        template: _.template( maintenanceAlertsTmpl ),
        
        events: {
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            // Testing something.
            this.content = this.template();
            Fuse.View.prototype.render.call( this );
        }

    });
});
