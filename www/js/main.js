/**
 * Fuse Mobile Application v0.0.7.3
 * Copyright Kynetx Inc. 2014. All Rights Reserved.
 * Developed by Phillip J. Windley, Alex K. Olson, and Benjamin K. Anderson.
 * For details see https://kynetx.com
 */
 require(["fuse", "cloudos", "jquery", "routers/app.router", "routers/fleet.router", "controllers/app.controller", "controllers/fleet.controller", "jquerymobile", "tooltipster", "sidr"], function(Fuse, CloudOS, $, AppRouter, FleetRouter, AppController, FleetController) {

    /**
     * Takes the output from $.fn.serializeArray() and turns
     * it into an object ready to be consumed.
     */
    $.fn.serializeObject = function() {
        var obj = {},
            data = this.serializeArray();

        _.each(data, function( chunk ) {
            // If there's no value, dont make it part of the final object.
            if ( chunk.value === "" || chunk.value === null || chunk.value === undefined || typeof chunk.value === "undefined" ) {
                return true;
            }

            obj[ chunk.name ] = chunk.value;
        });

        return obj;
    };

    Fuse.FIXTURES = {
        "fleet": {
            "aggregates": {
                "month": {
                    "trip": {
                        "distance": 2456,
                        "time": 123456234,
                        "cost": 102.34
                    },
                    "fuel": {
                        "mpg": 25.4,
                        "gallons": 50,
                        "cost": 200,
                        "cpg": 2.77,
                        "cpm": 0.95
                    }
                },
                "year": {
                    "trip": {
                        "distance": 100000,
                        "time": 12345678234,
                        "cost": 900
                    }
                },
                "total": {
                    "trip": {
                        "distance": 150000,
                        "time": 123345678910123456789,
                        "cost": 5000
                    },
                    "fuel": {
                        "mpg": 21.3,
                        "gallons": 1000,
                        "cost": 5000,
                        "cpg": 3.32,
                        "cpm": 0.73
                    }
                }
            },
            
            "index": [{
                "id": "VSPQ",
                "default": 1,
                "vin": "1FTFW1EV6AKA75407",
                "nickname" : "F-150",
                "year" : "2010",
                "make" : "Ford",
                "model" : "F-150 Supercrew",
                "icon" : "https://s3.amazonaws.com/k-mycloud/a169x672/7BD0B300-7DDF-11E2-AB3A-B9D7E71C24E1.img?q=97013",
                "notes" : "",
                "mileage": 159774,
                "address": "George S. Eccles Dinosaur Park, 1544 Park Blvd, Ogden, UT 84401",
                "lastWaypoint": {
                    "timestamp": "20140116T152440+0000",
                    "latitude": 41.238178,
                    "longitude": -111.937246
                },
                "reminders": [
                    {
                        "reason": "Tire Rotation",
                        "trigger": {
                            "type": "mileage",
                            "value": 56000
                        }
                    },
                    {
                        "reason": "Air Conditioner Flush",
                        "trigger": {
                            "type": "mileage",
                            "value": 60000 
                        }
                    },
                    {
                        "reason": "Headlight Replacement",
                        "trigger": {
                            "type": "date",
                            "value": "2014-05-09" 
                        }
                    },
                ],
                "history" : [
                    {
                        "reason": "Check Engine Light",
                        "trigger": {
                            "type": "date",
                            "value": "2014-05-01"
                        }
                    }
                ],
                "timestamp": "20140116T151952+0000",
                "running": false,
                "fuelRate": 1.2,
                "fuelLevel" : 37,
                "coolantTemperature": 163,
                "batteryVoltage": 13.2,
                "odometer": 65345,
                "header": 272,
                "speed": 0,
                "aggregates": {
                    "month": {
                        "trip": {
                            "distance": 400,
                            "time": 9999999554,
                            "cost": 150
                        },
                        "fuel": {
                            "mpg": 17.2,
                            "gallons": 20,
                            "cost": 100,
                            "cpm": 0.50,
                            "cpg": 2.75
                        }
                    },
                    "year": {
                        "trip": {
                            "distance": 500,
                            "time": 1234567,
                            "cost": 800
                        }
                    },
                    "total": {
                        "trip": {
                            "distance": 24567,
                            "time": 12345678,
                            "cost": 2000
                        }
                    }
                }
            },
            {
                "id": "V4GM",
                "vin": "4TAWNSFDDSKLFJ",
                "nickname" : "Tacoma",
                "year" : "2000",
                "make" : "Toyota",
                "model" : "Tacoma",
                "icon" : "https://s3.amazonaws.com/k-mycloud/a169x672/B87948E0-2306-11E3-953D-B39BDC00B96D.img?q=49420",
                "notes" : "I love this truck!",
                "mileage": 273000,
                "address": "Kynetx, 3098 Executive Pkwy, Lehi, UT 84043",
                "lastWaypoint": {
                    "timestamp": "20140116T152440+0000",
                    "latitude": 40.42970,
                    "longitude": -111.89830
                },
                "reminders": [
                    {
                        "reason": "Oil Change",
                        "trigger": {
                            "type": "mileage",
                            "value": 105000
                        }
                    },
                    {
                        "reason": "Saftey/Emissions check",
                        "trigger": {
                            "type": "date",
                            "value": "2014-05-16" 
                        }
                    },
                    {
                        "reason": "Replace Battery",
                        "trigger": {
                            "type": "date",
                            "value": "2014-05-20" 
                        }
                    }
                ],
                "timestamp": "20140116T151952+0000",
                "running": false,
                "fuelRate": 1.2,
                "fuelLevel" : 89,
                "coolantTemperature": 163,
                "batteryVoltage": 11.1,
                "odometer": 65345,
                "header": 272,
                "speed": 0,
                "aggregates": {
                    "month": {
                        "trip": {
                            "distance": 24,
                            "time": 123456,
                            "cost": 50
                        },
                        "fuel": {
                            "mpg": 17.2,
                            "gallons": 20,
                            "cost": 100,
                            "cpm": 0.50,
                            "cpg": 2.73
                        }
                    },
                    "year": {
                        "trip": {
                            "distance": 500,
                            "time": 1234567,
                            "cost": 800
                        }
                    },
                    "total": {
                        "trip": {
                            "distance": 24567,
                            "time": 12345678923,
                            "cost": 2000
                        }
                    }
                }
            },
            {
                "id": "VN0E",
                "vin": "Y257JX9AXQDXI529",
                "nickname": "Fiesta",
                "year": "1998",
                "make": "Ford",
                "model": "Fiesta",
                "icon": "style/images/ford_fiesta.jpg",
                "notes": "Labore consectetur et proident veniam mollit. In minim reprehenderit proident et. Elit fugiat cillum sit cillum quis. Elit ad ullamco velit laborum amet exercitation ea. Nisi ea nostrud ullamco ipsum magna consequat id qui",
                "mileage": 84519,
                "address": "E 9th S, Salt Lake City, UT, 84104",
                "lastWaypoint": {
                    "timestamp": "19925606T185601T+07:00",
                    "latitude": 40.74937,
                    "longitude": -111.82633
                },
                "alerts": [
                    {
                        "code": "P0193",
                        "message": "Fuel Rail Pressure Sensor Circuit High Input",
                        "timestamp": "never"
                    }
                ],
                "reminders": [
                    {
                        "reason": "Repair Dent",
                        "trigger": {
                            "type": "date",
                            "value": "2014-05-07"
                        }
                    }
                ],
                "timestamp": "19910831T060849T+07:00",
                "running": true,
                "fuelRate": 2.63,
                "fuelLevel": 5,
                "coolantTemperature": 95,
                "batteryVoltage": 12.4,
                "odometer": 19725,
                "heading": 270,
                "speed": 27,
                "aggregates": {
                    "month": {
                        "trip": {
                            "distance": 78,
                            "time": 2520000,
                            "cost": 82
                        },
                        "fuel": {
                            "mpg": 17.2,
                            "gallons": 20,
                            "cost": 100,
                            "cpm": 0.50,
                            "cpg": 2.71
                        }
                    },
                    "year": {
                        "trip": {
                            "distance": 500,
                            "time": 1234567,
                            "cost": 800
                        }
                    },
                    "total": {
                        "trip": {
                            "distance": 24567,
                            "time": 12345678923,
                            "cost": 2000
                        }
                    }
                }
            }]
        },
        
        "trips": 
        [
        {
            "cost": 23,
            "startWaypoint": {
                "longitude": "-111.67925",
                "timestamp": "20140425T001224+0000",
                "latitude": "40.281229"
            },
            "endWaypoint": {
                "longitude": "-111.679976",
                "timestamp": "20140425T001331+0000",
                "latitude": "40.281081"
            },
            "endTime": "20140425T001331+0000",
            "id": 277765,
            "startTime": "20140425T001224+0000",
            "mileage": 12.3
        },
        {
            "cost": 14.5,
            "startWaypoint": {
                "longitude": "-111.734885",
                "timestamp": "20140419T164337+0000",
                "latitude": "40.32578"
            },
            "endWaypoint": {
                "longitude": "-111.729682",
                "timestamp": "20140419T164554+0000",
                "latitude": "40.327388"
            },
            "endTime": "20140419T164554+0000",
            "startTime": "20140419T164337+0000",
            "id": 273350,
            "mileage": 15
        },
        {
            "cost": 35,
            "startWaypoint": {
                "longitude": "-111.723092",
                "timestamp": "20140429T042338+0000",
                "latitude": "40.32697"
            },
            "endWaypoint": {
                "longitude": "-111.686875",
                "timestamp": "20140429T043204+0000",
                "latitude": "40.33465"
            },
            "endTime": "20140429T043204+0000",
            "startTime": "20140429T042338+0000",
            "id": 281165,
            "mileage": 68
        },
        {
            "cost": 24,
            "startWaypoint": {
                "longitude": "-111.730186",
                "timestamp": "20140426T201528+0000",
                "latitude": "40.350103"
            },
            "endWaypoint": {
                "longitude": "-111.686909",
                "timestamp": "20140426T202226+0000",
                "latitude": "40.334689"
            },
            "endTime": "20140426T202226+0000",
            "id": 279399,
            "startTime": "20140426T201528+0000",
            "mileage": 16
        },
        {
            "cost": 34,
            "startWaypoint": {
                "longitude": "-111.729678",
                "timestamp": "20140419T165246+0000",
                "latitude": "40.327397"
            },
            "endWaypoint": {
                "longitude": "-111.686984",
                "timestamp": "20140419T170113+0000",
                "latitude": "40.334696"
            },
            "endTime": "20140419T170113+0000",
            "id": 273355,
            "startTime": "20140419T165246+0000",
            "mileage": 67
        },
        {
            "cost": 23,
            "startWaypoint": {
                "longitude": "-111.686878",
                "timestamp": "20140419T003219+0000",
                "latitude": "40.334677"
            },
            "endWaypoint": {
                "longitude": "-111.686849",
                "timestamp": "20140419T003258+0000",
                "latitude": "40.334646"
            },
            "endTime": "20140419T003258+0000",
            "startTime": "20140419T003219+0000",
            "id": 272975,
            "mileage": 12
        },
        {
            "cost": 26,
            "startWaypoint": {
                "longitude": "-111.686814",
                "timestamp": "20140426T191529+0000",
                "latitude": "40.334131"
            },
            "endWaypoint": {
                "longitude": "-111.709021",
                "timestamp": "20140426T192100+0000",
                "latitude": "40.32667"
            },
            "endTime": "20140426T192100+0000",
            "id": 279346,
            "startTime": "20140426T191529+0000",
            "mileage": 14
        },
        {
            "cost": 30,
            "endWaypoint": {
                "longitude": "-111.713935",
                "timestamp": "20140430T005458+0000",
                "latitude": "40.333857"
            },
            "startWaypoint": {
                "longitude": "-111.686949",
                "timestamp": "20140430T004914+0000",
                "latitude": "40.334648"
            },
            "cost": "0",
            "endTime": "20140430T005458+0000",
            "startTime": "20140430T004914+0000",
            "id": 282046,
            "mileage": 15
        },
        {
            "cost": 40,
            "startWaypoint": {
                "longitude": "-111.730383",
                "timestamp": "20140426T194737+0000",
                "latitude": "40.350067"
            },
            "endWaypoint": {
                "longitude": "-111.730575",
                "timestamp": "20140426T194901+0000",
                "latitude": "40.349888"
            },
            "endTime": "20140426T194901+0000",
            "id": 279373,
            "startTime": "20140426T194737+0000",
            "mileage": 15
        },
        {
            "cost": 35,
            "startWaypoint": {
                "longitude": "-111.691067",
                "timestamp": "20140426T164741+0000",
                "latitude": "40.337207"
            },
            "endWaypoint": {
                "longitude": "-111.686893",
                "timestamp": "20140426T181053+0000",
                "latitude": "40.334669"
            },
            "endTime": "20140426T181053+0000",
            "id": 279206,
            "startTime": "20140426T164741+0000",
            "mileage": 12
        },
        {
            "cost": 23,
            "startWaypoint": {
                "longitude": "-111.697044",
                "timestamp": "20140425T040346+0000",
                "latitude": "40.33397"
            },
            "endWaypoint": {
                "longitude": "-111.686893",
                "timestamp": "20140425T042502+0000",
                "latitude": "40.334663"
            },
            "endTime": "20140425T042502+0000",
            "id": 277941,
            "startTime": "20140425T040346+0000",
            "mileage": 34
        },
        {
            "cost": 40,
            "startWaypoint": {
                "longitude": "-111.960195",
                "timestamp": "20140421T022624+0000",
                "latitude": "41.671552"
            },
            "endWaypoint": {
                "longitude": "-111.686915",
                "timestamp": "20140421T041036+0000",
                "latitude": "40.33467"
            },
            "endTime": "20140421T041036+0000",
            "startTime": "20140421T022624+0000",
            "id": 274233,
            "mileage": 25
        },
        {
            "cost": 60,
            "endWaypoint": {
                "longitude": "-111.686901",
                "timestamp": "20140430T014614+0000",
                "latitude": "40.334667"
            },
            "startWaypoint": {
                "longitude": "-111.713852",
                "timestamp": "20140430T014038+0000",
                "latitude": "40.335492"
            },
            "cost": "0",
            "endTime": "20140430T014614+0000",
            "startTime": "20140430T014038+0000",
            "id": 282087,
            "mileage": 30
        },
        {
            "cost": 80,
            "startWaypoint": {
                "longitude": "-111.75362",
                "timestamp": "20140420T051251+0000",
                "latitude": "40.392471"
            },
            "endWaypoint": {
                "longitude": "-111.75362",
                "timestamp": "20140420T051320+0000",
                "latitude": "40.392471"
            },
            "endTime": "20140420T051320+0000",
            "id": 273829,
            "startTime": "20140420T051251+0000",
            "mileage": 400
        },
        {
            "cost": 82,
            "endWaypoint": {
                "longitude": "-111.980386",
                "timestamp": "20140423T012413+0000",
                "latitude": "40.7793"
            },
            "startWaypoint": {
                "longitude": "-111.686876",
                "timestamp": "20140423T003618+0000",
                "latitude": "40.334533"
            },
            "endTime": "20140423T012413+0000",
            "id": 275971,
            "startTime": "20140423T003618+0000",
            "mileage": "42.6"
        },
        {
            "cost": 89,
            "startWaypoint": {
                "longitude": "-111.715609",
                "timestamp": "20140425T223413+0000",
                "latitude": "40.338704"
            },
            "endWaypoint": {
                "longitude": "-111.686875",
                "timestamp": "20140425T223852+0000",
                "latitude": "40.334654"
            },
            "endTime": "20140425T223852+0000",
            "id": 278640,
            "startTime": "20140425T223413+0000",
            "mileage": 41
        },
        {
            "cost": 78,
            "endWaypoint": {
                "longitude": "-111.686906",
                "timestamp": "20140422T000001+0000",
                "latitude": "40.334565"
            },
            "startWaypoint": {
                "longitude": "-111.723503",
                "timestamp": "20140421T235208+0000",
                "latitude": "40.328104"
            },
            "endTime": "20140422T000001+0000",
            "id": 275030,
            "startTime": "20140421T235208+0000",
            "mileage": "42.8"
        },
        {
            "cost": 78,
            "startWaypoint": {
                "longitude": "-111.656993",
                "timestamp": "20140424T190529+0000",
                "latitude": "40.276768"
            },
            "endWaypoint": {
                "longitude": "-111.68686",
                "timestamp": "20140424T193034+0000",
                "latitude": "40.334673"
            },
            "endTime": "20140424T193034+0000",
            "id": 277466,
            "startTime": "20140424T190529+0000",
            "mileage": 34
        },
        {
            "cost": 100,
            "endWaypoint": {
                "longitude": "-111.686943",
                "timestamp": "20140423T035644+0000",
                "latitude": "40.334683"
            },
            "startWaypoint": {
                "longitude": "-111.696982",
                "timestamp": "20140423T035429+0000",
                "latitude": "40.334193"
            },
            "endTime": "20140423T035644+0000",
            "id": 276088,
            "startTime": "20140423T035429+0000",
            "mileage": 50
        },
        {
            "cost": 34,
            "endWaypoint": {
                "longitude": "-111.723216",
                "timestamp": "20140425T233455+0000",
                "latitude": "40.327998"
            },
            "startWaypoint": {
                "longitude": "-111.715624",
                "timestamp": "20140425T232832+0000",
                "latitude": "40.33875"
            },
            "endTime": "20140425T233455+0000",
            "id": 278747,
            "startTime": "20140425T232832+0000",
            "mileage": 23
        },
        {
            "cost": 100,
            "startWaypoint": {
                "longitude": "-111.679005",
                "timestamp": "20140419T160906+0000",
                "latitude": "40.281085"
            },
            "endWaypoint": {
                "longitude": "-111.679479",
                "timestamp": "20140419T161018+0000",
                "latitude": "40.280746"
            },
            "endTime": "20140419T161018+0000",
            "id": 273317,
            "startTime": "20140419T160906+0000",
            "mileage": 50
        },
        {
            "cost": 150,
            "startWaypoint": {
                "longitude": "-111.762841",
                "timestamp": "20140426T162825+0000",
                "latitude": "40.332566"
            },
            "endWaypoint": {
                "longitude": "-111.691129",
                "timestamp": "20140426T164612+0000",
                "latitude": "40.337153"
            },
            "endTime": "20140426T164612+0000",
            "id": 279192,
            "startTime": "20140426T162825+0000",
            "mileage": 75
        },
        {
            "cost": 67,
            "startWaypoint": {
                "longitude": "-111.686963",
                "timestamp": "20140419T232233+0000",
                "latitude": "40.334661"
            },
            "endWaypoint": {
                "longitude": "-111.757351",
                "timestamp": "20140419T233831+0000",
                "latitude": "40.36482"
            },
            "endTime": "20140419T233831+0000",
            "id": 273719,
            "startTime": "20140419T232233+0000",
            "mileage": 35
        },
        {
            "cost": 34,
            "startWaypoint": {
                "longitude": "-111.687185",
                "timestamp": "20140427T160406+0000",
                "latitude": "40.33468"
            },
            "endWaypoint": {
                "longitude": "-111.697014",
                "timestamp": "20140427T160611+0000",
                "latitude": "40.334028"
            },
            "endTime": "20140427T160611+0000",
            "startTime": "20140427T160406+0000",
            "id": 279809,
            "mileage": 12
        }
        ],

        "fillups": [
        {
           "numGallons" : 16,
           "priceGallon": 3.12,
           "cost"       : 49.12,
           "odometer"   : 72345,
           "gasStation" : "Crest"
        }
        ]
    };

    Fuse.menu = [{
        action: "settings",
        text: "Settings"
    },
    {
        action: "fleet",
        text: "Fleet"
    },
    {
        action: "logout",
        text: "Logout"
    }];

    // intialize the routers.
    Fuse.routers = {};
    Fuse.routers.AppRouter = new AppRouter();
    Fuse.routers.FleetRouter = new FleetRouter();
    // initialize the controllers.
    Fuse.routers.AppRouter.controller = new AppController();
    Fuse.routers.FleetRouter.controller = new FleetController();
    // this is used for prefiltering Fuse.show() requests. Mainly for early-stage development and probably
    // a good idea to remove later.
    Fuse.routes = Object.keys(_.extend(Fuse.routers.AppRouter.routes, Fuse.routers.FleetRouter.routes));

    // remove this for production.
    Fuse.logging = true;
    // setup loggger 
    if ( Fuse.logging ) {
        Fuse.log = Function.prototype.bind.apply( console.log, [ console, "Fuse v" + Fuse.VERSION + ":" ] );
    } else {
        Fuse.log = function() {};
    }

    window[ "Fuse" ] = Fuse;
    
    // start the app.
    document.addEventListener( "deviceready", function() {
        Fuse.init();
    });
});
