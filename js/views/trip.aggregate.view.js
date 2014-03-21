define([ "fuse", "jquery", "underscore", "text!templates/tripaggregatetmpl.html" ], function( Fuse, $, _, tripAggregateTmpl ) {
    return Fuse.View.extend({
        id: "trips",
        tagName: "div",
        role: "page",
        transiton: "slide",
        template: _.template( tripAggregateTmpl ),

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            this.collection.each(function ( vehicle ) {
            }, this );
        }
    });
});
