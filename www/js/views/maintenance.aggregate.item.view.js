define([ "fuse", "jquery", "underscore", "text!templates/maintenanceaggregateitemtmpl.html" ], function( Fuse, $, _, maintenanceAggregateItemTmpl ) {
    // represets an item in the vehicle list.
    return Fuse.View.extend({
        tagName: "div",
        className: "maintenance-aggregate-item round-box",

        attributes: function() {
            return {
                "data-vid": this.model.get( "id" )
            };
        },
        
        template: _.template( maintenanceAggregateItemTmpl ),

        initialize: function() {
            // *jedi hand wave* This is not the initialize function you are loooking for.
            // Move along, move along.
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        }
    });
});
