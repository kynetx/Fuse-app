define(["backbone", "jquery", "underscore", "collections/vehicles.collection", "views/vehicle.view"], function(Backbone, $, _, VehicleCollection, VehicleView) {
    return Backbone.View.extend({
        id: "vehicles",
        el: "#vehicles",

        initialize: function(vehicles) {
            this.collection = new VehicleCollection(vehicles);
            this.render();
        },

        render: function() {
            this.collection.each(function(vehicle) {
                this.renderVehicle(vehicle);
            }, this);
            $.mobile.changePage("#" + this.id, {
                "changeHash": false,
                "role": this.role
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
