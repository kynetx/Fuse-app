define([ "fuse", "jquery", "underscore", "views/settings.view", "views/settings.profile.view" ], function( Fuse, $, _, SettingsView, ProfileSettingsView ) {
    return Fuse.Controller.extend({

        init: function() {
            this.views = {

                Settings: new SettingsView({
                    controller: this
                }),

                ProfileSettings: new ProfileSettingsView({
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
        }
    });
});
