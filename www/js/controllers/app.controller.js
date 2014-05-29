define(["fuse", "jquery", "underscore"], function(Fuse, $, _) {
    return Fuse.Controller.extend({

        init: function() {
            this.views = {};
        },

        showVehicleListFromHome: function() {
            Fuse.show("fleet");
        },

        showSettingsPane: function() {
            this.views[ "Settings" ] = new SettingsView();

            this.views.Settings.render();
        }
    });
});
