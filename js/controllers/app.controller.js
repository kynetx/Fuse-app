define(["backbone", "fuse", "jquery", "underscore"], function(Backbone, Fuse, $, _) {
    return Fuse.Controller.extend({
        showVehicleListFromHome: function() {
            Backbone.history.navigate("vehicles", {trigger: true});
        }
    });
});
