define(["fuse", "jquery", "underscore"], function(Fuse, $, _) {
    return Fuse.Router.extend({
        routes: {
            "": "showVehicleListFromHome",
            "home": "showVehicleListFromHome"
        },

        showVehicleListFromHome: function() {
            this.invokeControllerFunction( "showVehicleListFromHome", arguments );
        },
    });
});
