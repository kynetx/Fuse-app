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
            "alerts": [
                {
                    "code": "0000",
                    "message": "none",
                    "timestamp": "never"
                },
            ],
            "reminders": {
                "never": {
                    "id": "never",
                    "reason": "none",
                    "trigger": {
                        "type": "none",
                        "value": "none"
                    }
                }
            },
            "history": {
                "never": {
                    "id": "never",
                    "reason": "none",
                    "status": "none",
                    "updated": "never",
                    "cost": 0.0,
                    "receipt": "none",
                    "vendor": "none",
                    "trigger": {
                        "type": "none",
                        "value": "none"
                    }
                }
            },
            "address": "none",
            "timestamp": "never",
            "running": "never",
            "fuelrate": 0.0,
            "fuellevel" : 0.0,
            "mpg" : 0.0,
            "coolantTemperature": 0,
            "batteryVoltage": 0.0,
            "header": 0,
            "speed": 0,
	    "voltage": "unknown",
	    "coolantTemperature": "unknown",
            "aggregates": {
                "month": {
                    "distance": 0,
                    "time": 0,
                    "cost": 0
                },
                "year": {
                    "distance": 0,
                    "time": 0,
                    "cost": 0
                },
                "total": {
                    "distance": 0,
                    "time": 0,
                    "cost": 0
                }
            }
        }
    });
});
