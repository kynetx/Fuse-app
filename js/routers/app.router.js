define(["fuse", "jquery", "underscore", "controllers/app.controller"], function(Fuse, $, _, AppController) {
    return Fuse.Router.extend({
        routes: {
            "": "showVehicleListFromHome",
            "home": "showVehicleListFromHome",
            "panel-menu": "showPanelMenu"
        },

        controller: new AppController(),

        showPanelMenu: function() {
            this.controller.showPanelMenu();
        },

        showVehicleListFromHome: function() {
        	this.controller.showVehicleListFromHome();
        },
    });
});
