define([ "fuse", "cloudos", "jquery", "underscore", "views/settings.view", "views/settings.profile.view", "views/settings.preferences.view", "views/settings.trip.categories.view", "views/settings.car.view", "views/login.view" ], function( Fuse, CloudOS, $, _, SettingsView, ProfileSettingsView, PreferencesSettingsView, TripCategorySettingsView, CarSettingsView, LoginView ) {
    return Fuse.Controller.extend({

        init: function() {
            this.views = {

                Login: new LoginView({
                    controller: this
                }),

                Settings: new SettingsView({
                    controller: this
                }),

                ProfileSettings: new ProfileSettingsView({
                    controller: this
                }),

                PreferencesSettings: new PreferencesSettingsView({
                    controller: this
                }),

                TripCategorySettings: new TripCategorySettingsView({
                    controller: this
                }),

                CarSettings: new CarSettingsView({
                    controller: this
                })
            };
        },

        showVehicleListFromHome: function() {
            Fuse.show("fleet");
        },

        showLoginPane: function() {
            this.views.Login.render();
        },

        nukeSession: function() {
            CloudOS.removeSession();
            Fuse.show('login');
        },

        showSettingsPane: function() {
            this.views.Settings.render();
        },

        showProfilePane: function() {
            this.views.ProfileSettings.render();
        },

        showPreferencesPane: function() {
            this.views.PreferencesSettings.render();
        },

        showTripCategorySettings: function() {
            this.views.TripCategorySettings.render();
        },

        showCarSettings: function() {
            this.views.CarSettings.render();
        }
    });
});
