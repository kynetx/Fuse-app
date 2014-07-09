define(["fuse", "jquery", "underscore", "text!templates/tripaggregateitemtmpl.html"], function( Fuse, $, _, tripAggregateItemTmpl ) {
    // represets an item in the vehicle list.
    return Fuse.View.extend({
        tagName: "div",
        className: "trip-aggregate-item",

        attributes: function() {
            return {
                "data-vid": this.model.get( "picoId" )
            };
        },
        
        template: _.template( tripAggregateItemTmpl ),

        initialize: function() {
            // *jedi hand wave* This is not the initialize function you are loooking for.
            // Move along, move along.
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },
    });
});
