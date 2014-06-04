define(["fuse", "jquery", "underscore"], function(Fuse, $, _) {
    return Fuse.Router.extend({
        routes: {
            ""                      : "showVehicleListFromHome",
            "home"                  : "showVehicleListFromHome",
            "settings"              : "showSettingsPane",
            "settings-profile"      : "showProfilePane",
            "settings-preferences"  : "showPreferencesPane",
            "settings-reminders"    : "showRecurringMaintenanceReminderSettings",
            "settings-cars"         : "showCarSettings",
            "settings-categories"   : "showTripCategorySettings"
        },

        showVehicleListFromHome: function() {
            this.invokeControllerFunction( "showVehicleListFromHome", arguments );
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
