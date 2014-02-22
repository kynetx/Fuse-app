define(["fuse", "jquery", "underscore", "text!templates/vehicleItemTmpl.html"], function(Fuse, $, _, vehicleItemTmpl) {
	// represets an item in the vehicle list.
    return Fuse.View.extend({
        tagName: "li",
        className: "vehicle",
        template: _.template(vehicleItemTmpl),

        // do nothing for now
        initialize: function() {},

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});
