define([ "fuse", "jquery", "underscore", "cloudos" ], function( Fuse, $, _, CloudOS ) {
    return Fuse.Router.extend({
        routes: {
            ""                      : "showVehicleListFromHome",
            "home"                  : "showVehicleListFromHome",
            "about"                 : "showAbout",
            "login"                 : "showLoginPane",
            "logout"                : "nukeSession",
            "settings"              : "showSettingsPane",
            "settings-profile"      : "showProfilePane",
            "settings-preferences"  : "showPreferencesPane",
            "settings-reminders"    : "showRecurringMaintenanceReminderSettings",
            "settings-cars"         : "showCarSettings",
            "settings-categories"   : "showTripCategorySettings"
        },

        showVehicleListFromHome: function() {
            CloudOS.retrieveSession();
            if ( CloudOS.authenticatedSession() ) {
                this.invokeControllerFunction( "showVehicleListFromHome", arguments );
            } else {
                Fuse.show( "login" );
            }
        },

        showLoginPane: function() {
            this.invokeControllerFunction( "showLoginPane", arguments );
        },

        showAbout: function() {
            this.invokeControllerFunction( "showAbout", arguments );
        },

        nukeSession: function() {
            this.invokeControllerFunction( "nukeSession", arguments );
        },

        showSettingsPane: function() {
            this.invokeControllerFunction( "showSettingsPane", arguments );
        },

        showProfilePane: function() {
            this.invokeControllerFunction( "showProfilePane", arguments );
        },

        showPreferencesPane: function() {
            this.invokeControllerFunction( "showPreferencesPane", arguments );
        },

        showCarSettings: function() {
            this.invokeControllerFunction( "showCarSettings", arguments );
        },

        showRecurringMaintenanceReminderSettings: function() {
            this.invokeControllerFunction( "showRecurringMaintenanceReminderSettings", arguments );
        },

        showTripCategorySettings: function() {
            this.invokeControllerFunction( "showTripCategorySettings", arguments );
        }
    });
});
