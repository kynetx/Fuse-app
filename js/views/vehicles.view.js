define(["fuse", "jquery", "underscore", "collections/vehicles.collection", "views/vehicle.item.view"], function(Fuse, $, _,VehicleCollection, VehicleItemView) {
    // represents the view that contains the vehicle list.
    return Fuse.View.extend({
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
            // call the super class render(), which does all the jQuery mobile goodness.
            this.__super__.render(this, arguments);
        },

        renderVehicle: function(vehicle) {
            var view = new VehicleItemView({
                model: vehicle
            });
            this.$el.append(view.render().el);
        }
    });
});
