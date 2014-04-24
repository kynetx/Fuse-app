define([ "fuse", "jquery", "underscore", "text!templates/maintenancereminderstmpl.html" ], function( Fuse, $, _, maintenanceRemindersTmpl ) {
    return Fuse.View.extend({
        id: "maintenance-reminders",
        tagName: "div",
        role: "page",
        header: "Fleet Reminders",
        transition: "slide",
        template: _.template( maintenanceRemindersTmpl ),
        
        events: {
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            if ( this.model ) {
                this.header = this.model.get( "nickname" ) + " Alerts";
            }
            this.reminders = [];
        },

        render: function() {
            // Handle re-renders correctly.
            this.reminders.length = 0;
            
            // Are we rendering reminders for the whole fleet or just one vehicle?
            if ( this.model ) {
                this.collectVehicleReminders( this.model );
            } else {
                // The whole fleet.
                this.controller.fleet.each(function( vehicle ) {
                    this.collectVehicleReminders( vehicle );
                }, this);
            }

            this.content = this.template({ data: this.reminders });
            Fuse.View.prototype.render.call( this );
        },

        collectVehicleReminders: function( vehicle ) {
            if ( vehicle.get( "reminders" ) !== vehicle.defaults.reminders ) {
                // We have some reminders.
            }
        }
    });
});
