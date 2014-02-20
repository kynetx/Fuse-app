define(["backbone", "jquery", "underscore", "views/vehicles.view"], function(Backbone, $, _, VehiclesView) {
    return {
        showVehicleList: function() {
            // this is just dummy data for now.
            new VehiclesView([{
                "default": 1,
                "vin": "1FTFW1EV6AKA75407",
                "nickname" : "Truck",
                "year" : "2010",
                "make" : "Ford",
                "model" : "F-150 Supercrew",
                "icon" : "https://s3.amazonaws.com/k-mycloud/a169x672/7BD0B300-7DDF-11E2-AB3A-B9D7E71C24E1.img?q=97013",
                "notes" : "",
                "mileage": 159774,
                "lastWaypoint": {
                   "timestamp": "20140116T152440+0000",
                    "latitude": 28.088505,
                    "longitude": -82.578467
                },
                "timestamp": "20140116T151952+0000",
                "running": false,
                "fulerate": 1.2,
                "fuellevel" : 20,
                "coolantTemperature": 163,
                "batteryVoltage": 13.2,
                "odometer": 65345,
                "header": 272,
                "speed": 72
            },
            {
                "vin": "FAKE_VIN",
                "nickname" : "",
                "year" : "2000",
                "make" : "Toyota",
                "model" : "Tacoma",
                "icon" : "https://s3.amazonaws.com/k-mycloud/a169x672/B87948E0-2306-11E3-953D-B39BDC00B96D.img?q=49420",
                "notes" : "I love this truck!",
                "mileage": 273000,
                "lastWaypoint": {
                   "timestamp": "20140116T152440+0000",
                    "latitude": 28.088505,
                    "longitude": -82.578467
                },
                "timestamp": "20140116T151952+0000",
                "running": false,
                "fulerate": 1.2,
                "fuellevel" : 20,
                "coolantTemperature": 163,
                "batteryVoltage": 13.2,
                "odometer": 65345,
                "header": 272,
                "speed": 72
            }]);
        }
    };
});
