define(["fuse", "jquery", "underscore", "text!templates/fueltmpl.html"], function(Fuse, $, _, fuelTmpl) {
	// represets an item in the vehicle list.
    return Fuse.View.extend({
        tagName: "div",
        role: "page",
        header: "Fleet",
        transition: "fade",
        template: _.template(fuelTmpl),

        initialize: function() {/* do nothing for now */},

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});