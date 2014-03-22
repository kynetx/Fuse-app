define(["fuse", "jquery", "underscore", "text!templates/tripaggregateitemtmpl.html"], function( Fuse, $, _, tripAggregateItemTmpl ) {
    // represets an item in the vehicle list.
    return Fuse.View.extend({
        tagName: "div",
        className: "trip-aggregate-item",
        template: _.template( tripAggregateItemTmpl ),

        initialize: function() {/* do nothing for now */},

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        }
    });
});
