define([ "fuse", "jquery", "underscore", "views/settings.view", "views/settings.profile.view", "views/settings.preferences.view" ], function( Fuse, $, _, SettingsView, ProfileSettingsView, PreferencesSettingsView ) {
    return Fuse.Controller.extend({

        init: function() {
            this.views = {

                Settings: new SettingsView({
                    controller: this
                }),

                ProfileSettings: new ProfileSettingsView({
                    controller: this
                }),

                PreferencesSettings: new PreferencesSettingsView({
                    controller: this
                })
            };
        },

        showVehicleListFromHome: function() {
            Fuse.show("fleet");
        },

        showSettingsPane: function() {
            this.views.Settings.render();
        },

        showProfilePane: function() {
            this.views.ProfileSettings.render();
        },

        showPreferencesPane: function() {
            this.views.PreferencesSettings.render();
        }
    });
});
