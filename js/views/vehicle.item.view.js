define(["backbone", "jquery", "underscore", "text!templates/vehicleItemTmpl.html"], function(Backbone, $, _, vehicleItemTmpl) {
	// represets an item in the vehicle list.
    return Backbone.View.extend({
        tagName: "li",
        className: "vehicle",
        template: _.template(vehicleItemTmpl),

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});
