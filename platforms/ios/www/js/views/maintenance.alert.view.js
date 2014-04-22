define([ "fuse", "jquery", "underscore", "text!templates/maintenancealerttmpl.html" ], function( Fuse, $, _, maintenanceAlertTmpl ) {
    return Fuse.View.extend({
        className: "maintenance-alert",
        tagName: "div",
        role: "page",
        transition: "slide",
        template: _.template( maintenanceAlertTmpl ),

        attributes: {
        },
        
        events: {
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            this.$el.html( this.template() );
            return this;
        }

    });
});
