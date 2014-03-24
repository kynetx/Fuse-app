define([ "backbone", "fuse", "jquery", "underscore", "text!templates/triptmpl.html" ], function( Backbone, Fuse, $, _, tripTmpl ) {
    return Fuse.View.extend({
        tagName: "div",
        className: "trip",
        attributes: {
            "data-role": "collapsible",
            "data-content-theme": "c"
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