define([ "fuse", "jquery", "underscore", "models/vehicle.model", "fuseapi" ], function( Fuse, $, _, Vehicle, API ) {
    return Fuse.Collection.extend({
        model: Vehicle,

        sync: function( method, model, options ) {
            var __self__ = this;

            switch( method ) {
                case "read":
                    var vehicles = [];
                    Fuse.loading( "show", "fetching fleet details..." );

                    API.vehicleSummary(function( response ) {

                        for ( var v in response ) {
                            vehicles.push( response[ v ] );
                        }

                        __self__.set( vehicles, { silent: true });

                        options.success( response );
                    });

                    break;
                default:
                    options.error( "API method not implemented yet." );
            }

        }
    });
});
