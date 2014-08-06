define([ "fuse", "jquery", "underscore", "models/vehicle.model", "fuseapi" ], function( Fuse, $, _, Vehicle, API ) {
    return Fuse.Collection.extend({
        model: Vehicle,

        sync: function( method, model, options ) {
            var __self__ = this;

            switch( method ) {
                case "read":
                    Fuse.loading( "show", "fetching fleet details..." );
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
                    options.error( "API method not implemented yet." );
            }

        }
    });
});
