define(["fuse", "jquery", "underscore"], function(Fuse, $, _) {
    return Fuse.Router.extend({
        routes: {
            ""          : "showVehicleListFromHome",
            "home"      : "showVehicleListFromHome",
            "settings"  : "showSettingsPane"
        },

        showVehicleListFromHome: function() {
            this.invokeControllerFunction( "showVehicleListFromHome", arguments );
        },

        showSettingsPane: function() {
            this.invokeControllerFunction( "showSettingsPane", arguments );
        }
    });
});
