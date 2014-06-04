define([ "fuse", "jquery", "underscore", "text!templates/settingsprofiletmpl.html" ], function( Fuse, $, _, settingsProfileTmpl ) {
    return Fuse.View.extend({
        id: "settings",
        tagName: "div",
        role: "page",
        header: "Profile",
        transition: "slide",
        template: _.template( settingsProfileTmpl ),
        
        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            this.content = this.template();
            Fuse.View.prototype.render.call( this );
        }
    });
});
