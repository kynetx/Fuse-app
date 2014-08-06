define([ "fuse", "jquery", "underscore", "text!templates/abouttmpl.html" ], function( Fuse, $, _, aboutTmpl ) {
    return Fuse.View.extend({
        id: "about",
        tagName: "div",
        role: "page",
        header: "About",
        transition: "slide",
        template: _.template( aboutTmpl ),

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            this.content = this.template({version: Fuse.VERSION});
            Fuse.View.prototype.render.call( this );
        }
    });
});
