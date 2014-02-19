define(["backbone", "jquery", "underscore", "text!templates/vehicle.html"], function(Backbone, $, _, VehicleTemplate) {
    return Backbone.View.extend({
        tagName: "li",
        className: "vehicle",
        template: _.template(VehicleTemplate)

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});
