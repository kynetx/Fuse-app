define(["fuse", "jquery", "underscore", "controllers/app.controller"], function(Fuse, $, _, AppController) {
    return Fuse.Router.extend({
        routes: {
            "": "showVehicleListFromHome",
            "home": "showVehicleListFromHome"
        },

        controller: new AppController(),
        
        showVehicleListFromHome: function() {
        	this.controller.showVehicleListFromHome();
        },
    });
});
