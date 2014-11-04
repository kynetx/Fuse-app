define([ "fuse", "models/fillup.model", "fuseapi" ], function( Fuse, Fillup, API ) {
    return Fuse.Collection.extend({
        model: Fillup,

	comparator: function(a,b){ return a.get("timestamp") > b.get("timestamp"); },

        sync: function( method, model, options ) {
            switch( method ) {
                case "read":
                    // Fetch all the fillups ( month to date ).
                    Fuse.loading( "show", "Fetching fillups for " + Fuse.longMonths[ Fuse.currentMonth ] );

                    // Compute the timestamps for month to date.
                    var monthStart = new Date(Fuse.currentYear, Fuse.currentMonth, 1),
                        monthEnd = new Date(Fuse.currentYear, Fuse.currentMonth + 1, 1);

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
