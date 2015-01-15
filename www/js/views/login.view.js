define([ "fuse", "fuseapi", "jquery", "underscore", "cloudos", "text!templates/logintmpl.html" ], function( Fuse, API, $, _, CloudOS, loginTmpl ) {
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

            Fuse.loading( "show", "Logging you in...." );
            CloudOS.login( username, password, function( response ) {
                Fuse.loading( "hide" );
                Fuse.log( response );

                if ( !response.OAUTH_ECI ) {
                    alert( 'Could not log you in. Please double check your email/password and try again.' );
                } else {
                    localStorage.setItem( "com.kynetx.cloudos.DEFAULT_ECI", response.OAUTH_ECI );
                    API.fuse_version = null;
                    API.init(function() {
                        Fuse.flushFleetCache = true;
                        Fuse.flushTripCache = true;
                        Fuse.flushTripAggCache = true;
                        Fuse.flushFuelCache = true;
                        Fuse.flushFuelAggCache = true;
                        Fuse.show( "fleet" );
                    });
                }

            }, function() {
                alert('Fatal error: network connectivity or other fatal problem.');
            });

            e.handled = true;
        }
    });
});
