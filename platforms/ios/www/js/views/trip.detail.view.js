define([ "fuse", "jquery", "underscore" ], function( Fuse, $, _ ) {
    return Fuse.View.extend({
        tagName: "div",
        id: "trip-detail",
        header: "Trip",
        role: "page",
        transition: "slide",

        initialize: function( options ) {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },
        
        render: function() {
            Fuse.View.prototype.render.call( this );
        }
    });
});
