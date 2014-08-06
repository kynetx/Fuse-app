define([ "fuse", "jquery", "underscore" ], function( Fuse, $, _ ) {
    return Fuse.Model.extend({
        defaults: {
            "distance": 0,
            "cost": 0,
            "time": 0
        },

        sync: function(method, model, options) {
            switch(method) {
                case 'read':
                    var now = new Date();
                    Fuse.loading('show', 'fetching' + ' ' + 'summaries');
                    API[options.type + 'Summaries'](

                        now.getFullYear(),

                        '0' + (now.getMonth() + 1),

                        function(res) {
                            Fuse.loading('hide');
                            if (typeof res.skyCloudError === 'undefined') {
                                alert('Fillup succesfully added.');
                                if (typeof options.success === 'function') {
                                    options.success();
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