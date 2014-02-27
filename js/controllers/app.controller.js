define(["fuse", "jquery", "underscore"], function(Fuse, $, _) {
    return Fuse.Controller.extend({
        showVehicleListFromHome: function() {
            Fuse.show("vehicles");
        },

        showPanelMenu: function() {
        	$("#panel-menu").panel("toggle");
        }
    });
});
