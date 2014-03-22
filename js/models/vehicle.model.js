define(["fuse", "jquery", "underscore"], function(Fuse, $, _) {
    return Fuse.Model.extend({
        defaults: {
            "default": 1,
            "vin": "XXXXXX",
            "nickname" : "none",
            "year" : "YYYY",
            "make" : "none",
            "model" : "none",
            "icon" : "none",
            "notes" : "none",
            "mileage": 0,
            "lastWaypoint": {
                "timestamp": "never",
                "latitude": 0.0,
                "longitude": 0.0
            },
            "timestamp": "never",
            "running": "never",
            "fuelrate": 0.0,
            "fuellevel" : 0.0,
            "coolantTemperature": 0,
            "batteryVoltage": 0.0,
            "header": 0,
            "speed": 0
        }
    });
});
