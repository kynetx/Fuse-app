define([ "fuse", "jquery", "underscore", "text!templates/settingscartmpl.html" ], function( Fuse, $, _, settingsCarTmpl ) {
    return Fuse.View.extend({
        id: "settings-car",
        tagName: "div",
        role: "page",
        header: "Car Linkage",
        transition: "slide",
        template: _.template( settingsCarTmpl ),

        events: {
           "change #settings-eci": "setECI"
        },
        
        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            this.content = this.template();
            Fuse.View.prototype.render.call( this );

            $( "#settings-eci" ).val( localStorage.getItem( "com.kynetx.fuse.ECI" ) );
        },

        setECI: function( e ) {
            localStorage.setItem( "com.kynetx.fuse.ECI", $( "#settings-eci" ).val() );

            e.handled = true;
        }
    });
});
