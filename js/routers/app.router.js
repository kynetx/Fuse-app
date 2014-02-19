define(["backbone", "jquery", "underscore", "controllers/app.controller"], function(Backbone, $, _ AppController) {
    return Backbone.Router.extend({
        routes: {
            "": "showVehicleListFromHome",
            "home": "showVehicleListFromHome"
        },
        showVehicleListFromHome: function() {
            AppController.showVehicleListFromHome();
        }
    });
});
