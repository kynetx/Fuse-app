define([ "fuse", "jquery", "underscore" ], function( Fuse, $, _ ) {
    return Fuse.Model.extend({
        defaults: {
            "distance": 0,
            "cost": 0,
            "time": 0
        },

        sync: function(method, model, options) {
            switch(method) {
                case 'THIS_DOES_NOT_EXIST':
                    Fuse.loading('show', 'fetching' + ' ' + 'summaries');
                    API[options.type + 'Summaries'](

                        Fuse.currentFuelContext,

                        { 
                            volume: model.get('numGallons'), 
                            unitPrice: model.get('priceGallon'), 
                            odometer: model.get('odometer'),
                            location: model.get('gasStation'),
                            when: model.get('timestamp')
                        }, 

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
                    });

                    break;
                default:
                    options.error('API method not yet implemented');
                    break;
            }
        }
    });
});