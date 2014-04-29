/**
 * Fuse Mobile Application v0.0.6.2
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
                        "distance": 2456789,
                        "time": 12345678234,
                        "cost": 800
                    }
                },
                "total": {
                    "trip": {
                        "distance": 245678910,
                        "time": 12345678923234,
                        "cost": 20000
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
                            "distance": 24,
                            "time": 123456,
                            "cost": 50
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
                            "distance": 24,
                            "time": 123456,
                            "cost": 50
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
        
        "trips": [{
            "id": 2689,
            "distance": 2258.4,
            "startTime": " 20131001T051219+T+06:00 ",
            "endTime": " 20070512T140235+T+06:00 ",
            "cost": 50.34,
            "startWaypoint": {
                "longitude": "-111.712584",
                "timestamp": " 20010602T075441+T+06:00 ",
                "latitude": "40.038496"
            },
            "endWaypoint": {
                "longitude": "-111.898162",
                "timestamp": " 19891202T025427+T+07:00 ",
                "latitude": "40.429706"
            },
            "waypoints": [{
                "timestamp": "20140319T170155+0000",
                "value": "40.429706,-111.898162",
                "id": 11416600,
                "translatedValue": "40.429706,-111.898162",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T165706+0000",
                "value": "40.430665,-111.897155",
                "id": 11416406,
                "translatedValue": "40.430665,-111.897155",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T165206+0000",
                "value": "40.430793,-111.896004",
                "id": 11416187,
                "translatedValue": "40.430793,-111.896004",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T164706+0000",
                "value": "40.431183,-111.889580",
                "id": 11416020,
                "translatedValue": "40.431183,-111.889580",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T164206+0000",
                "value": "40.375006,-111.814038",
                "id": 11415843,
                "translatedValue": "40.375006,-111.814038",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T163706+0000",
                "value": "40.322120,-111.727220",
                "id": 11415639,
                "translatedValue": "40.322120,-111.727220",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T163206+0000",
                "value": "40.249005,-111.695123",
                "id": 11415458,
                "translatedValue": "40.249005,-111.695123",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T162706+0000",
                "value": "40.173321,-111.646477",
                "id": 11415285,
                "translatedValue": "40.173321,-111.646477",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T162206+0000",
                "value": "40.099830,-111.688129",
                "id": 11415076,
                "translatedValue": "40.099830,-111.688129",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T161706+0000",
                "value": "40.044507,-111.727809",
                "id": 11414745,
                "translatedValue": "40.044507,-111.727809",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T161206+0000",
                "value": "40.038496,-111.712584",
                "id": 11414566,
                "translatedValue": "40.038496,-111.712584",
                "key": "GEN_WAYPOINT"
            }
            ]
        },
        {
            "id": 9396,
            "distance": 2995.8,
            "startTime": " 19880117T105725+T+07:00 ",
            "endTime": " 19980513T124658+T+06:00 ",
            "cost": 20.36,
            "startWaypoint": {
                "longitude": "-111.712584",
                "timestamp": " 20080227T053351+T+07:00 ",
                "latitude": "40.038496"
            },
            "endWaypoint": {
                "longitude": "-111.898162",
                "timestamp": " 19930611T180254+T+06:00 ",
                "latitude": "40.429706"
            },
            "waypoints": [
            {
                "timestamp": "20140319T170155+0000",
                "value": "40.429706,-111.898162",
                "id": 11416600,
                "translatedValue": "40.429706,-111.898162",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T165706+0000",
                "value": "40.430665,-111.897155",
                "id": 11416406,
                "translatedValue": "40.430665,-111.897155",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T165206+0000",
                "value": "40.430793,-111.896004",
                "id": 11416187,
                "translatedValue": "40.430793,-111.896004",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T164706+0000",
                "value": "40.431183,-111.889580",
                "id": 11416020,
                "translatedValue": "40.431183,-111.889580",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T164206+0000",
                "value": "40.375006,-111.814038",
                "id": 11415843,
                "translatedValue": "40.375006,-111.814038",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T163706+0000",
                "value": "40.322120,-111.727220",
                "id": 11415639,
                "translatedValue": "40.322120,-111.727220",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T163206+0000",
                "value": "40.249005,-111.695123",
                "id": 11415458,
                "translatedValue": "40.249005,-111.695123",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T162706+0000",
                "value": "40.173321,-111.646477",
                "id": 11415285,
                "translatedValue": "40.173321,-111.646477",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T162206+0000",
                "value": "40.099830,-111.688129",
                "id": 11415076,
                "translatedValue": "40.099830,-111.688129",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T161706+0000",
                "value": "40.044507,-111.727809",
                "id": 11414745,
                "translatedValue": "40.044507,-111.727809",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T161206+0000",
                "value": "40.038496,-111.712584",
                "id": 11414566,
                "translatedValue": "40.038496,-111.712584",
                "key": "GEN_WAYPOINT"
            }
            ]
        },
        {
            "id": 70,
            "distance": 190.4,
            "startTime": " 19980310T122959+T+07:00 ",
            "endTime": " 20050223T194338+T+07:00 ",
            "cost": 15.46,
            "startWaypoint": {
                "longitude": "-111.712584",
                "timestamp": " 19880318T122527+T+07:00 ",
                "latitude": "40.038496"
            },
            "endWaypoint": {
                "longitude": "-111.898162",
                "timestamp": " 20130221T104612+T+07:00 ",
                "latitude": "40.429706"
            },
            "waypoints": [
            {
                "timestamp": "20140319T170155+0000",
                "value": "40.429706,-111.898162",
                "id": 11416600,
                "translatedValue": "40.429706,-111.898162",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T165706+0000",
                "value": "40.430665,-111.897155",
                "id": 11416406,
                "translatedValue": "40.430665,-111.897155",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T165206+0000",
                "value": "40.430793,-111.896004",
                "id": 11416187,
                "translatedValue": "40.430793,-111.896004",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T164706+0000",
                "value": "40.431183,-111.889580",
                "id": 11416020,
                "translatedValue": "40.431183,-111.889580",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T164206+0000",
                "value": "40.375006,-111.814038",
                "id": 11415843,
                "translatedValue": "40.375006,-111.814038",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T163706+0000",
                "value": "40.322120,-111.727220",
                "id": 11415639,
                "translatedValue": "40.322120,-111.727220",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T163206+0000",
                "value": "40.249005,-111.695123",
                "id": 11415458,
                "translatedValue": "40.249005,-111.695123",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T162706+0000",
                "value": "40.173321,-111.646477",
                "id": 11415285,
                "translatedValue": "40.173321,-111.646477",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T162206+0000",
                "value": "40.099830,-111.688129",
                "id": 11415076,
                "translatedValue": "40.099830,-111.688129",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T161706+0000",
                "value": "40.044507,-111.727809",
                "id": 11414745,
                "translatedValue": "40.044507,-111.727809",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T161206+0000",
                "value": "40.038496,-111.712584",
                "id": 11414566,
                "translatedValue": "40.038496,-111.712584",
                "key": "GEN_WAYPOINT"
            }
            ]
        },
        {
            "id": 3602,
            "distance": 916.4,
            "startTime": " 20080425T051529+T+06:00 ",
            "endTime": " 20100124T003217+T+07:00 ",
            "cost": 51.12,
            "startWaypoint": {
                "longitude": "-111.712584",
                "timestamp": " 19880822T093631+T+06:00 ",
                "latitude": "40.038496"
            },
            "endWaypoint": {
                "longitude": "-111.898162",
                "timestamp": " 19921217T165437+T+07:00 ",
                "latitude": "40.429706"
            },
            "waypoints": [
            {
                "timestamp": "20140319T170155+0000",
                "value": "40.429706,-111.898162",
                "id": 11416600,
                "translatedValue": "40.429706,-111.898162",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T165706+0000",
                "value": "40.430665,-111.897155",
                "id": 11416406,
                "translatedValue": "40.430665,-111.897155",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T165206+0000",
                "value": "40.430793,-111.896004",
                "id": 11416187,
                "translatedValue": "40.430793,-111.896004",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T164706+0000",
                "value": "40.431183,-111.889580",
                "id": 11416020,
                "translatedValue": "40.431183,-111.889580",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T164206+0000",
                "value": "40.375006,-111.814038",
                "id": 11415843,
                "translatedValue": "40.375006,-111.814038",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T163706+0000",
                "value": "40.322120,-111.727220",
                "id": 11415639,
                "translatedValue": "40.322120,-111.727220",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T163206+0000",
                "value": "40.249005,-111.695123",
                "id": 11415458,
                "translatedValue": "40.249005,-111.695123",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T162706+0000",
                "value": "40.173321,-111.646477",
                "id": 11415285,
                "translatedValue": "40.173321,-111.646477",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T162206+0000",
                "value": "40.099830,-111.688129",
                "id": 11415076,
                "translatedValue": "40.099830,-111.688129",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T161706+0000",
                "value": "40.044507,-111.727809",
                "id": 11414745,
                "translatedValue": "40.044507,-111.727809",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T161206+0000",
                "value": "40.038496,-111.712584",
                "id": 11414566,
                "translatedValue": "40.038496,-111.712584",
                "key": "GEN_WAYPOINT"
            }
            ]
        },
        {
            "id": 955,
            "distance": 3844.8,
            "startTime": " 20010802T051005+T+06:00 ",
            "endTime": " 19970317T101045+T+07:00 ",
            "cost": 61.09,
            "startWaypoint": {
                "longitude": "-111.712584",
                "timestamp": " 19980330T181325+T+07:00 ",
                "latitude": "40.038496"
            },
            "endWaypoint": {
                "longitude": "-111.898162",
                "timestamp": " 19930929T144047+T+06:00 ",
                "latitude": "40.429706"
            },
            "waypoints": [
            {
                "timestamp": "20140319T170155+0000",
                "value": "40.429706,-111.898162",
                "id": 11416600,
                "translatedValue": "40.429706,-111.898162",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T165706+0000",
                "value": "40.430665,-111.897155",
                "id": 11416406,
                "translatedValue": "40.430665,-111.897155",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T165206+0000",
                "value": "40.430793,-111.896004",
                "id": 11416187,
                "translatedValue": "40.430793,-111.896004",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T164706+0000",
                "value": "40.431183,-111.889580",
                "id": 11416020,
                "translatedValue": "40.431183,-111.889580",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T164206+0000",
                "value": "40.375006,-111.814038",
                "id": 11415843,
                "translatedValue": "40.375006,-111.814038",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T163706+0000",
                "value": "40.322120,-111.727220",
                "id": 11415639,
                "translatedValue": "40.322120,-111.727220",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T163206+0000",
                "value": "40.249005,-111.695123",
                "id": 11415458,
                "translatedValue": "40.249005,-111.695123",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T162706+0000",
                "value": "40.173321,-111.646477",
                "id": 11415285,
                "translatedValue": "40.173321,-111.646477",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T162206+0000",
                "value": "40.099830,-111.688129",
                "id": 11415076,
                "translatedValue": "40.099830,-111.688129",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T161706+0000",
                "value": "40.044507,-111.727809",
                "id": 11414745,
                "translatedValue": "40.044507,-111.727809",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T161206+0000",
                "value": "40.038496,-111.712584",
                "id": 11414566,
                "translatedValue": "40.038496,-111.712584",
                "key": "GEN_WAYPOINT"
            }
            ]
        },
        {
            "id": 5771,
            "distance": 3684.5,
            "startTime": " 20021021T200358+T+06:00 ",
            "endTime": " 20071018T025449+T+06:00 ",
            "cost": 34.16,
            "startWaypoint": {
                "longitude": "-111.712584",
                "timestamp": " 19930312T103224+T+07:00 ",
                "latitude": "40.038496"
            },
            "endWaypoint": {
                "longitude": "-111.898162",
                "timestamp": " 19880612T150256+T+06:00 ",
                "latitude": "40.429706"
            },
            "waypoints": [
            {
                "timestamp": "20140319T170155+0000",
                "value": "40.429706,-111.898162",
                "id": 11416600,
                "translatedValue": "40.429706,-111.898162",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T165706+0000",
                "value": "40.430665,-111.897155",
                "id": 11416406,
                "translatedValue": "40.430665,-111.897155",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T165206+0000",
                "value": "40.430793,-111.896004",
                "id": 11416187,
                "translatedValue": "40.430793,-111.896004",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T164706+0000",
                "value": "40.431183,-111.889580",
                "id": 11416020,
                "translatedValue": "40.431183,-111.889580",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T164206+0000",
                "value": "40.375006,-111.814038",
                "id": 11415843,
                "translatedValue": "40.375006,-111.814038",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T163706+0000",
                "value": "40.322120,-111.727220",
                "id": 11415639,
                "translatedValue": "40.322120,-111.727220",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T163206+0000",
                "value": "40.249005,-111.695123",
                "id": 11415458,
                "translatedValue": "40.249005,-111.695123",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T162706+0000",
                "value": "40.173321,-111.646477",
                "id": 11415285,
                "translatedValue": "40.173321,-111.646477",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T162206+0000",
                "value": "40.099830,-111.688129",
                "id": 11415076,
                "translatedValue": "40.099830,-111.688129",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T161706+0000",
                "value": "40.044507,-111.727809",
                "id": 11414745,
                "translatedValue": "40.044507,-111.727809",
                "key": "GEN_WAYPOINT"
            },
            {
                "timestamp": "20140319T161206+0000",
                "value": "40.038496,-111.712584",
                "id": 11414566,
                "translatedValue": "40.038496,-111.712584",
                "key": "GEN_WAYPOINT"
            }
            ]
        }],
        
        "fillups": []
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
    
    // start the app.
    document.addEventListener( "deviceready", function() {
        Fuse.init();
    });
});
