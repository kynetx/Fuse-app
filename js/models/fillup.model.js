define([ "fuse" ], function( Fuse ) {
    return Fuse.Model.extend({
        defaults: {
            "gallons": 0,
            "ppg": 0.00,
            "location": {
                "lattitude": 0,
                "longitude": 0
            }
        }
    });
});
