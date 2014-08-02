define([ "fuse", "models/fillup.model" ], function( Fuse, Fillup ) {
    return Fuse.Collection.extend({
        model: Fillup,

        sync: function( method, model, options ) {
            switch( method ) {
                case "read":
                    // Fetch all the fillups ( month to date ).
                    Fuse.loading( "show", "Fetching fillups for the past month..." );

                    // Compute the timestamps for month to date.
                    var now = new Date(), monthStart = new Date( now.getFullYear(), now.getMonth() );

                    var __self__ = this;

                    // Grab the fillups.
                    API.fillupsByDate( options.fuelECI, monthStart.toISOString(), now.toISOString(), function( response ) {
                        Fuse.loading( "hide" );
                        if ( typeof response.skyCloudError === "undefined" ) {
                            __self__.set( response, { silent: true });
                            options.success( response );
                        } else {
                            options.error( response );
                        }
                    }, { force: true });

                    break;
                default:
                    options.error( "API method not yet implemented." );
            }
        }
    });
});
