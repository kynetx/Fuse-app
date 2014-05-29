define(["fuse", "jquery", "underscore"], function(Fuse, $, _) {
    return Fuse.Controller.extend({
        showVehicleListFromHome: function() {
            Fuse.show("fleet");
        },
        
        showSettingsPane: function() {
            Fuse.show( "settings" );
        }
    });
});
