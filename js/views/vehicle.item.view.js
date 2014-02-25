define(["fuse", "jquery", "underscore", "text!templates/vehicleitemtmpl.html"], function(Fuse, $, _, vehicleItemTmpl) {
	// represets an item in the vehicle list.
    return Fuse.View.extend({
        tagName: "li",
        className: "vehicle",
        attributes: {
            "data-vid": "VXXX"
        },
        template: _.template(vehicleItemTmpl),

        // do nothing for now
        initialize: function() {},

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});
