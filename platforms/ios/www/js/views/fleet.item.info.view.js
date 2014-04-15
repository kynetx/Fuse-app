define(["fuse", "jquery", "underscore", "text!templates/fleetiteminfotmpl.html"], function(Fuse, $, _, fleetItemInfoTmpl) {
	// represets an item in the vehicle list.
    return Fuse.View.extend({
        tagName: "li",
        className: "fleet-item-info",
        template: _.template(fleetItemInfoTmpl),

        initialize: function() {/* do nothing for now */},

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});
