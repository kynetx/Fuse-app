define([ "fuse", "jquery", "underscore", "cloudos", "text!templates/logintmpl.html" ], function( Fuse, $, _, CloudOS, loginTmpl ) {
    return Fuse.View.extend({
        id: "login",
        tagName: "div",
        role: "page",
        header: "Login",
        transition: "slide",
        template: _.template( loginTmpl ),

        events: {
            // Collect login info and submit it via CloudOS...
            "tap #login": "credentialsToTokens"
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            this.content = this.template();
            this.disableHeader = true;
            this.disableFooter = true;
            Fuse.View.prototype.render.call( this );
        },

        credentialsToTokens: function( e ) {
            var username = $( "#login-username" ).val(),
                password = $( "#login-password" ).val();

            Fuse.loading( "show", "logging you in...." );
            CloudOS.login( username, password, function( response ) {
                Fuse.loading( "hide" );
                Fuse.log( response );

                if ( !response.OAUTH_ECI ) {
                    alert( response.msg );
                } else {
                    Fuse.show( "fleet" );
                }

            }, function() {
                alert( "something went wrong!" );
            });

            e.handled = true;
        }
    });
});
