define([ "fuse", "jquery", "underscore", "text!templates/loadingtmpl.html" ], function( Fuse, $, _, loadingTmpl ) {
    return Fuse.View.extend({
        id: "loading",
        tagName: "div",
        role: "page",
        header: "Loading",
        transition: "slide",
        template: _.template( loginTmpl ),

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function(message) {
            this.content = this.template();
            this.disableHeader = true;
            this.disableFooter = true;
            Fuse.View.prototype.render.call( this );
            Fuse.loading('show', message);
        }
    });
});
