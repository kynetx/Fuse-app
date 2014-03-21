define(["fuse", "jquery", "underscore", "text!templates/tripheadertmpl.html"], function( Fuse, $, _, tripHeaderTmpl ) {
	// represets an item in the vehicle list.
    return Fuse.View.extend({
        tagName: "div",
        className: "trip-aggregate-header",
        attributes: {
            "data-role": "collapsible",
            "data-content-theme": "c"
        },
        template: _.template( tripHeaderTmpl ),

        initialize: function() {/* do nothing for now */},

        render: function() {
            this.$el.html( this.template( this.model.get("aggregates").trips ) );
            return this;
        }
    });
});
