define(["fuse", "jquery", "underscore"], function(Fuse, $, _) {
    return Fuse.Controller.extend({
        showVehicleListFromHome: function() {
            Fuse.history.navigate("vehicles", {trigger: true});
        }
    });
});
