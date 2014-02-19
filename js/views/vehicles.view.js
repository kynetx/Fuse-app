define(["backbone", "jquery", "underscore", "collections/vehicles.collection", "views/vehicle.view"], function(Backbone, $, _, VehicleCollection, VehicleView) {
    return Backbone.View.extend({
        el: "#vehicles",

        initialize: function(vehicles) {
            this.collection = new VehicleCollection(vehicles);
            this.render();
        },

        render: function() {
            this.collection.each(function(vehicle) {
                this.renderVehicle(vehicle);
            }, this);
            $("#page-" + this.el.id).page();
            $.mobile.changePage(this.$el.closest("[data-role = 'page']"), {
                "transition": "slide",
                "changeHash": false
            });
        },

        renderVehicle: function(vehicle) {
            var view = new VehicleView({
                model: vehicle
            });
            this.$el.append(view.render().el);
        }
    });
});
