define(["fuse", "jquery", "underscore"], function(Fuse, $, _) {
    return Fuse.Router.extend({
        routes: {
            "fleet": "showVehicleList",
            "fleet/:id": "showVehicleDetail",
            "findcar": "showFindCar",
            "findcar/:id": "showFindCar"
        },

        showVehicleList: function() {
        	this.controller.showVehicleList();
        },

        showVehicleDetail: function(id) {
        	this.controller.showVehicleDetail(id);
        },

        showFindCar: function() {
            var args = arguments;

            // if we have an id.
            if (typeof args[0] !== "undefined") {
                this.controller.showFindCar(args[0]);
            } else {
                this.controller.showFindCar();
            }
        },
    });
});
