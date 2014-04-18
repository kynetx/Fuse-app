define([ "backbone", "fuse", "jquery", "underscore", "text!templates/triptmpl.html" ], function( Backbone, Fuse, $, _, tripTmpl ) {
    return Fuse.View.extend({
        tagName: "div",
        className: "trip",
        
        attributes: function() {
            return {
                "data-role": "collapsible",
                "data-inset": "false",
                "data-tid": this.model.get( "id" ),
                "data-iconpos": "right",
                "data-icon" : "arrow-r"
            };
        },
        
        template: _.template( tripTmpl ),

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        }
    });
});