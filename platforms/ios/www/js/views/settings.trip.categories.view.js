define([ "fuse", "jquery", "underscore", "text!templates/settingstripcategoriestmpl.html" ], function( Fuse, $, _, settingsTripCategoriesTmpl ) {
    return Fuse.View.extend({
        id: "settings",
        tagName: "div",
        role: "page",
        header: "Trip Categories",
        transition: "slide",
        template: _.template( settingsTripCategoriesTmpl ),
        
        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            this.content = this.template();
            Fuse.View.prototype.render.call( this );
        }
    });
});
