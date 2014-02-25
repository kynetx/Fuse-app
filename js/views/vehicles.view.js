define(["fuse", "jquery", "underscore", "collections/vehicles.collection", "views/vehicle.item.view", "text!templates/vehicleListTmpl.html"], function(Fuse, $, _,VehicleCollection, VehicleItemView, vehicleListTmpl) {
    // represents the view that contains the vehicle list.
    return Fuse.View.extend({
        tagName: "div",
        id: "vehicle-list",
        role: "page",
        header: "Vehicles",
        footer: "Fuse",
        transition: "fade",
        vehicleListTemplate: _.template(vehicleListTmpl),
        vehicleListItems: [],
        events: {
            "click .vehicle": "showVehicleDetail"
        },

        initialize: function(vehicles) {
            this.collection = new VehicleCollection(vehicles);
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
            Fuse.log("Clicked on: ", e, " going to show vehicle detail view.");
            Backbone.history.navigate("vehicle/" + $(e.target).attr("data-vid"));
        }
    });
});
