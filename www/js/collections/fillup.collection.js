define([ "fuse", "models/fillup.model" ], function( Fuse, Fillup ) {
    return Fuse.Collection.extend({
        model: Fillup,

        sync: function( method, model, options ) {
            switch( method ) {
                case "read":
                    // Fetch all the fillups ( month to date ).
                    Fuse.loading( "show", "Fetching fillups for the past month..." );

                    // Compute the timestamps for month to date.
                    var monthStart = new Date(Fuse.currentYear, Fuse.currentMonth, 1),
                        monthEnd = new Date(Fuse.currentYear, Fuse.currentMonth, 0);

                    var __self__ = this;

                    // Grab the fillups.
                    API.fillupsByDate(

                        options.fuelECI,

                        monthStart.toISOString(), 

                        monthEnd.toISOString(),

                        function( response ) {
                            Fuse.loading( "hide" );
                            if ( typeof response.skyCloudError === "undefined" ) {
                                options.success( response );
                            } else {
                                options.error( response );
                            }
                        }, 

                        {
                            force: true 
                        }
                    );

                    break;
                default:
                    options.error( "API method not yet implemented." );
                    break;
            }
        }
    });
});
