define([ "fuse", "jquery", "underscore", "text!templates/settingstmpl.html" ], function( Fuse, $, _, settingsTmpl ) {
    return Fuse.View.extend({
        id: "settings",
        tagName: "div",
        role: "page",
        header: "Settings",
        transition: "slide",
        template: _.template( settingsTmpl ),

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            Fuse.View.prototype.render.call( this );
            this.content = this.template();
        }
    });
});
