define(["backbone", "jquery", "underscore"], function(Backbone, $, _) {
    return {
        showVehicleListFromHome: function() {
            Backbone.history.navigate("vehicles", {trigger: true});
        }
    };
});
