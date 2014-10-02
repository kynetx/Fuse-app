define([ "fuse", "models/aggregate.model" ], function( Fuse, Aggregate ) {
    return Fuse.Collection.extend({
        model: Aggregate,

        initialize: function(models, options) {
            this.type = options.type;
        },

	comparator: function(a,b){ return a.get("profileName") > b.get("profileName"); },


        sync: function(method, model, options) {
            switch(method) {
                case 'read':
                    var now = new Date();
                    var formattedCurrentMonth;

                    if (Fuse.currentMonth < 10) {
                        formattedCurrentMonth = '0' + (Fuse.currentMonth + 1);
                    } else {
                        formattedCurrentMonth = Fuse.currentMonth + 1;
                    }
                    Fuse.loading('show', 'fetching ' + this.type + ' summaries');
                    API[this.type + 'Summaries'](

                        Fuse.currentYear,

                        formattedCurrentMonth,
                        
                        function(res) {
                            Fuse.loading('hide');
                            if (typeof res.skyCloudError === 'undefined') {
                                if (typeof options.success === 'function') {
                                    options.success(res);
                                }
                            } else {
                                if (typeof options.error === 'function') {
                                    options.error();
                                }
                            }
                        },

                        {
                            force: true
                        }
                    );
                    break;
                default:
                    options.error('API method not yet implemented');
                    break;
            }
        }
    });
});
