define(["fuse", "jquery", "underscore", "text!templates/fleetitemtmpl.html"], function(Fuse, $, _, fleetItemTmpl) {
	// represets an item in the vehicle list.
    return Fuse.View.extend({
        tagName: "li",
        className: "fleet-item",
        template: _.template(fleetItemTmpl),

        initialize: function() {/* do nothing for now */},

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});
