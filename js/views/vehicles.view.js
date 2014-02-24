define(["fuse", "jquery", "underscore", "collections/vehicles.collection", "views/vehicle.item.view"], function(Fuse, $, _,VehicleCollection, VehicleItemView) {
    // represents the view that contains the vehicle list.
    return Fuse.View.extend({
        tagName: "div",
        className: "vehicle-list",
        role: "page",
        header: "Vehicles",
        footer: "Fuse",
        transition: "fade",

        initialize: function(vehicles) {
            this.collection = new VehicleCollection(vehicles);
            this.render();
        },

        render: function() {
            this.collection.each(function(vehicle) {
                this.renderVehicle(vehicle);
            }, this);
            Fuse.View.prototype.render.apply(this, arguments);
        },

        renderVehicle: function(vehicle) {
            var view = new VehicleItemView({
                model: vehicle
            });
        }
    });
});
