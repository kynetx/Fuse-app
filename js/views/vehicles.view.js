define(["backbone", "jquery", "underscore", "collections/vehicles.collection", "views/vehicle.item.view"], function(Backbone, $, _, VehicleCollection, VehicleItemView) {
    // represents the view that contains the vehicle list.
    return Backbone.View.extend({
        tagName: "div",
        className: "vehicle-list",
        // header: _.template(headerTmpl("Vehicles")),
        role: "page",

        initialize: function(vehicles) {
            this.collection = new VehicleCollection(vehicles);
            this.render();
        },

        render: function() {
            this.collection.each(function(vehicle) {
                this.renderVehicle(vehicle);
            }, this);
            this.$el.page();
            $.mobile.changePage(this.$el, {
                "transition": "fade",
                "changeHash": false,
                "role": this.role
            });
        },

        renderVehicle: function(vehicle) {
            var view = new VehicleItemView({
                model: vehicle
            });
            this.$el.append(view.render().el);
        }
    });
});
