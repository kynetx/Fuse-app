define([ "fuse", "jquery", "underscore", "text!templates/settingstmpl.html" ], function( Fuse, $, _, settingsTmpl ) {
    return Fuse.View.extend({
        id: "settings",
        tagName: "div",
        role: "page",
        header: "Settings",
        transition: "slide",
        template: _.template( settingsTmpl ),

        events: {
            "tap [data-action='settings-profile']"      : "showProfilePane",
            "tap [data-action='settings-preferences']"  : "showPreferencePane",
            "tap [data-action='settings-cars']"         : "showCarSettings",
            "tap [data-action='settings-reminders']"    : "showRecurringMaintenanceReminderSettings",
            "tap [data-action='settings-categories']"   : "showTripCategorySettings"
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            this.content = this.template();
            Fuse.View.prototype.render.call( this );
        },

        showProfilePane: function( e ) {
            Fuse.show( "settings-profile" );

            e.handled = true;
        },

        showPreferencePane: function( e ) {
            alert( "Preference pane is under construction...coming shortly." );
            Fuse.show( "settings-preferences" );

            e.handled = true;
        },

        showCarSettings: function( e ) {
            alert( "Car linking feature is under construction...coming shortly." );
            Fuse.show( "settings-cars" );

            e.handled = true;
        },

        showRecurringMaintenanceReminderSettings: function( e ) {
            alert( "Recurring Maintenance Reminder setup/editing is under construction...coming shortly." );
            Fuse.show( "settings-reminders" );

            e.handled = true;
        },

        showTripCategorySettings: function( e ) {
            alert( "Custom trip categories coming shortly..." );
            Fuse.show( "settings-categories" );

            e.handled = true;
        }
    });
});
