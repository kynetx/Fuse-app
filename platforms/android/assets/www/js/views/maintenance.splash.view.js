define([ "fuse", "jquery", "underscore", "text!templates/maintenancesplashtmpl.html" ], function( Fuse, $, _, maintenanceSplashTmpl ) {
    return Fuse.View.extend({
        id: "maintenance-splash",
        tagName: "div",
        role: "page",
        header: "Car Care",
        transition: "slide",
        template: _.template( maintenanceSplashTmpl ),
        
        events: {
            "tap [data-action='alerts']"        : "showAlerts",
            "tap [data-action='reminders']"     : "showMaintenanceReminders",
            "tap [data-action='history']"       : "showHistory"
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },
        
        render: function() {
            this.content = this.template();
            Fuse.View.prototype.render.call( this );
        },

        showAlerts: function( e ) {
            Fuse.showWithContext( "maintenance-alerts" );
        },

        showMaintenanceReminders: function( e ) {
            Fuse.showWithContext( "maintenance-reminders" );
        },

        showHistory: function( e ) {
            Fuse.showWithContext( "maintenance-history" );
        }

    });
});
