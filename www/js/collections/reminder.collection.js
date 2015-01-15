define([ "fuse", "models/reminder.model", "fuseapi" ], function( Fuse, Reminder, API ) {
    return Fuse.Collection.extend({
        model: Reminder,

        comparator: function(a,b){ return a.get("timestamp") > b.get("timestamp"); },

        sync: function( method, model, options ) {
            switch (method) {
                case 'read':

                    Fuse.loading('show', 'fetching reminders for ' + Fuse.longMonths[Fuse.currentMonth] + '...');

                    var __self__ = this;

                    API.reminders(

                        Fuse.currentVehicleContext,

                        function(reminders) {

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
