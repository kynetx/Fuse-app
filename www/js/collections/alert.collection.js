define([ "fuse", "models/alert.model", "fuseapi" ], function( Fuse, Alert, API ) {
    return Fuse.Collection.extend({
        model: Alert,

        comparator: function(a,b) { return a.get("timestamp") > b.get("timestamp"); },

        sync: function( method, model, options ) {
            switch (method) {
                case 'read':

                    Fuse.loading('show', 'fetching alerts for ' + Fuse.longMonths[Fuse.currentMonth] + '...');

                    var __self__ = this;

                    API.alerts(

                        Fuse.currentVehicleContext,

                        function(alerts) {

                            if (typeof response.skyCloudError === 'undefined') {
                                options.success(reminders);
                            } else {
                                options.error(reminders);
                            }
                        },

                        {
                            force: true
                        }
                    );

                    break;
            }
        }

    });
});
