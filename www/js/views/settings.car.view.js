define([ "fuse", "jquery", "underscore", "text!templates/settingscartmpl.html" ], function( Fuse, $, _, settingsCarTmpl ) {
    return Fuse.View.extend({
        id: "settings-car",
        tagName: "div",
        role: "page",
        header: "Car Linkage",
        transition: "slide",
        template: _.template( settingsCarTmpl ),
        
        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            this.content = this.template();
            Fuse.View.prototype.render.call( this );
        }
    });
});
