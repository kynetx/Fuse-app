define([ "fuse" ], function( Fuse ) {
    return Fuse.Model.extend({

        defaults: {
            name: 'none',
            category: 'none'
        },
        
        sync: function(method, model, options) {
            switch(method) {
                case 'read':
                    Fuse.loading('show', 'Fetching trip...');
                    API.trips(Fuse.currentTripContext, model.get('id'), null, null, function(res) {
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
                    });
                    break;
                case 'update':
                    Fuse.loading('show', 'Updating trip...');
                    API.updateTrip(Fuse.currentTripContext, model.get('id'), model.get('name'), model.get('category'), function(res) {
                        Fuse.loading('hide');
                        if (typeof res.skyCloudError === 'undefined') {
                            if (typeof options.success === 'function') {
                                options.success();
                            }
                        } else {
                            if (typeof options.error === 'function') {
                                options.error();
                            }
                        }
                    });
                    break;
            }
        }
    });
});
