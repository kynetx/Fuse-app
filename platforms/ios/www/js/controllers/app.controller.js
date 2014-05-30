define([ "fuse", "jquery", "underscore", "views/settings.view" ], function( Fuse, $, _, SettingsView ) {
    return Fuse.Controller.extend({

        init: function() {
            this.views = {
                Settings: new SettingsView()
            };
        },

        showVehicleListFromHome: function() {
            Fuse.show("fleet");
        },

        showSettingsPane: function() {
            this.views.Settings.render();
        }
    });
});
