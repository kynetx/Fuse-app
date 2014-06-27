define([ "fuse", "jquery", "underscore", "text!templates/logintmpl.html" ], function( Fuse, $, _, loginTmpl ) {
    return Fuse.View.extend({
        id: "login",
        tagName: "div",
        role: "page",
        header: "Login",
        transition: "slide",
        template: _.template( loginTmpl ),

        events: {
            // Collect login info and submit it via CloudOS...
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            this.content = this.template();
            this.disableFooter = true, this.disableHeader = true;
            Fuse.View.prototype.render.call( this );
        }
    });
});
