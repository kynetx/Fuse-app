define([ "fuse" ], function( Fuse ) {
    return Fuse.Model.extend({
        defaults: {
            "numGallons": 0,
            "priceGallon": 0.00,
            "cost": 0,
            "odometer": 000000,
            "gasStation": "Chevron Salem (390 N SR 198, Salem)"
        }
    });
});
