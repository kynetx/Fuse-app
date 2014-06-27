define([ "fuse", "jquery", "underscore", "cloudos" ], function( Fuse, $, _, CloudOS ) {
    return Fuse.Router.extend({
        routes: {
            ""                      : "showVehicleListFromHome",
            "home"                  : "showVehicleListFromHome",
            "login"                 : "showLoginPane",
            "settings"              : "showSettingsPane",
            "settings-profile"      : "showProfilePane",
            "settings-preferences"  : "showPreferencesPane",
            "settings-reminders"    : "showRecurringMaintenanceReminderSettings",
            "settings-cars"         : "showCarSettings",
            "settings-categories"   : "showTripCategorySettings"
        },

        showVehicleListFromHome: function() {
            if ( CloudOS.authenticatedSession() ) {
                this.invokeControllerFunction( "showVehicleListFromHome", arguments );
            } else {
                Fuse.show( "login" );
            }
        },

        showLoginPane: function() {
            this.invokeControllerFunction( "showLoginPane", arguments );
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
