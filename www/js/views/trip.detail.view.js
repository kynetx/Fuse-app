define([ "fuse", "jquery", "underscore", "text!templates/tripdetailtmpl.html" ], function( Fuse, $, _, tripDetailTmpl ) {
    return Fuse.View.extend({
        tagName: "div",
        id: "trip-detail",
        header: "Trip",
        role: "page",
        transition: "slide",
        template: _.template( tripDetailTmpl ),

        initialize: function( options ) {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },
        
        render: function() {
            this.content = this.template();
            Fuse.View.prototype.render.call( this );
        }
    });
});
