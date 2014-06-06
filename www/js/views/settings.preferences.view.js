define([ "fuse", "jquery", "underscore", "text!templates/settingspreferencestmpl.html" ], function( Fuse, $, _, settingsPreferencesTmpl ) {
    return Fuse.View.extend({
        id: "settings",
        tagName: "div",
        role: "page",
        header: "Preferences",
        transition: "slide",
        template: _.template( settingsPreferencesTmpl ),
        
        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            this.content = this.template();
            Fuse.View.prototype.render.call( this );
        }
    });
});
