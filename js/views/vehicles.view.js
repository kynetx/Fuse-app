define(["backbone", "fuse", "jquery", "underscore", "views/vehicle.item.view", "text!templates/vehiclelisttmpl.html"], function(Backbone, Fuse, $, _, VehicleItemView, vehicleListTmpl) {
    // represents the view that contains the vehicle list.
    return Fuse.View.extend({
        tagName: "div",
        id: "vehicle-list",
        role: "page",
        header: "Vehicles",
        footer: "Fuse",
        transition: "fade",
        vehicleListTemplate: _.template(vehicleListTmpl),
        events: {
            "tap.show-vehicle-detail": "showVehicleDetail"
        },

        initialize: function() {
            this.vehicleListItems = [];
            this.render(); 
        },

        render: function() {
            this.collection.each(function(vehicle) {
                this.renderVehicle(vehicle);
            }, this);
            this.content = this.vehicleListTemplate({vehicles: this.vehicleListItems});
            Fuse.View.prototype.render.call(this);
        },

        renderVehicle: function(vehicle) {
            var view = new VehicleItemView({
                model: vehicle
            });
            this.vehicleListItems.push(view.render().el);
        },

        showVehicleDetail: function(e) {
            var $target = $(e.target);
            // get the vehicle id fo which we want to render a detail view.
            var vid = $target.closest("a").attr("data-vid");
            Fuse.show("vehicle", {id: vid});
            e.handled = true;
        }
    });
});
