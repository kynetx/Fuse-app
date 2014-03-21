define([ "fuse", "jquery", "underscore", "text!templates/tripaggregatetmpl.html", "text!templates/tripheadertmpl.html" ], function( Fuse, $, _, tripAggregateTmpl, tripHeaderTmpl ) {
    // trips view.
    return Fuse.View.extend({
        id: "trips",
        tagName: "div",
        role: "page",
        transiton: "slide",
        template: _.template( tripAggregateTmpl ),
        tripHeaderTemplate: _.template ( tripHeaderTmpl ),

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            this.collection.each(function ( vehicle ) {
            }, this );
        }
    });
});
