define(["fuse", "jquery", "underscore"], function(Fuse, $, _) {
    return Fuse.Router.extend({
        routes: {
            "fleet": "showFleet",
            "fleet/:id": "showVehicle",
            "findcar": "showFindCar",
            "findcar/:id": "showFindCar",
            "fuelsmart": "showFuelSmart"
        },
        
        showFleet: function() {
        	this.controller.showFleet();
        },

        showVehicle: function(id) {
        	this.controller.showVehicle(id);
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

        showfuelSmart: function() {
            this.controller.showFuelSmart();
        },
    });
});
