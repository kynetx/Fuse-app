define([ "fuse", "jquery", "underscore", "models/vehicle.model", "fuseapi" ], function( Fuse, $, _, Vehicle, API ) {
    return Fuse.Collection.extend({
        model: Vehicle,

	comparator: function(a,b){ return a.get("profileName") > b.get("profileName"); },

        sync: function( method, model, options ) {
            var __self__ = this;

            switch( method ) {
                case "read":
                
                    if (typeof options.silent === 'undefined') {
                        Fuse.loading( "show", "Fetching fleet details..." );
                    }

                    API.vehicleSummary(

                        function( response ) {
                            options.success( response );
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
