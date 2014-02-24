define(["fuse", "jquery", "underscore", "collections/vehicles.collection", "views/vehicle.item.view", "text!templates/vehicleListTmpl.html"], function(Fuse, $, _,VehicleCollection, VehicleItemView, vehicleListTmpl) {
    // represents the view that contains the vehicle list.
    return Fuse.View.extend({
        tagName: "div",
        className: "vehicle-list",
        role: "page",
        header: "Vehicles",
        footer: "Fuse",
        transition: "fade",
        vehicleListItems: [],

        initialize: function(vehicles) {
            this.collection = new VehicleCollection(vehicles);
            this.render();
        },

        render: function() {
            this.collection.each(function(vehicle) {
                this.renderVehicle(vehicle);
            }, this);
            Fuse.View.prototype.render.apply(this, [this.vehicleListItems]);
        },

        renderVehicle: function(vehicle) {
            var view = new VehicleItemView({
                model: vehicle
            });
            this.vehicleListItems.push(view.render().el)
        }
    });
});
