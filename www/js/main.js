/**
 * Fuse Mobile Application v0.0.6.4
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
        
        "trips": 
        [
        {
            "cost": "0",
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
            "mileage": "0.1"
        },
        {
            "cost": "0",
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
            "mileage": "0.5"
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": "2.8"
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": "0.6"
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": null
        },
        {
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
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686881",
                "timestamp": "20140425T224046+0000",
                "latitude": "40.334662"
            },
            "endWaypoint": {
                "longitude": "-111.715659",
                "timestamp": "20140425T224656+0000",
                "latitude": "40.338734"
            },
            "endTime": "20140425T224656+0000",
            "startTime": "20140425T224046+0000",
            "id": 278678,
            "mileage": null
        },
        {
            "endWaypoint": {
                "longitude": "-111.686906",
                "timestamp": "20140422T213452+0000",
                "latitude": "40.334667"
            },
            "startWaypoint": {
                "longitude": "-111.686832",
                "timestamp": "20140422T211439+0000",
                "latitude": "40.334649"
            },
            "endTime": "20140422T213452+0000",
            "id": 275773,
            "startTime": "20140422T211439+0000",
            "mileage": "5.4"
        },
        {
            "startWaypoint": {
                "longitude": "-111.933555",
                "timestamp": "20140420T200951+0000",
                "latitude": "41.6375"
            },
            "endWaypoint": {
                "longitude": "-111.96016",
                "timestamp": "20140420T201636+0000",
                "latitude": "41.671684"
            },
            "endTime": "20140420T201636+0000",
            "id": 274067,
            "startTime": "20140420T200951+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.712037",
                "timestamp": "20140418T020720+0000",
                "latitude": "40.332886"
            },
            "endWaypoint": {
                "longitude": "-111.686929",
                "timestamp": "20140418T021155+0000",
                "latitude": "40.33463"
            },
            "endTime": "20140418T021155+0000",
            "startTime": "20140418T020720+0000",
            "id": 272184,
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.68685",
                "timestamp": "20140418T174335+0000",
                "latitude": "40.334662"
            },
            "endWaypoint": {
                "longitude": "-111.71401",
                "timestamp": "20140418T174925+0000",
                "latitude": "40.334018"
            },
            "endTime": "20140418T174925+0000",
            "startTime": "20140418T174335+0000",
            "id": 272572,
            "mileage": null
        },
        {
            "endWaypoint": {
                "longitude": "-111.759318",
                "timestamp": "20140422T192931+0000",
                "latitude": "40.364244"
            },
            "startWaypoint": {
                "longitude": "-111.70727",
                "timestamp": "20140422T191908+0000",
                "latitude": "40.327335"
            },
            "endTime": "20140422T192931+0000",
            "id": 275653,
            "startTime": "20140422T191908+0000",
            "mileage": "4.4"
        },
        {
            "startWaypoint": {
                "longitude": "-111.722914",
                "timestamp": "20140426T040532+0000",
                "latitude": "40.327082"
            },
            "endWaypoint": {
                "longitude": "-111.686902",
                "timestamp": "20140426T041549+0000",
                "latitude": "40.33463"
            },
            "endTime": "20140426T041549+0000",
            "id": 278915,
            "startTime": "20140426T040532+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.696976",
                "timestamp": "20140427T161836+0000",
                "latitude": "40.334034"
            },
            "endWaypoint": {
                "longitude": "-111.686906",
                "timestamp": "20140427T162139+0000",
                "latitude": "40.334661"
            },
            "endTime": "20140427T162139+0000",
            "id": 279826,
            "startTime": "20140427T161836+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.715661",
                "timestamp": "20140429T170905+0000",
                "latitude": "40.273498"
            },
            "endWaypoint": {
                "longitude": "-111.686873",
                "timestamp": "20140429T174308+0000",
                "latitude": "40.334684"
            },
            "endTime": "20140429T174308+0000",
            "startTime": "20140429T170905+0000",
            "id": 281552,
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.660165",
                "timestamp": "20140419T195315+0000",
                "latitude": "40.237372"
            },
            "endWaypoint": {
                "longitude": "-111.658276",
                "timestamp": "20140419T200316+0000",
                "latitude": "40.251266"
            },
            "endTime": "20140419T200316+0000",
            "id": 273513,
            "startTime": "20140419T195315+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.657713",
                "timestamp": "20140419T203832+0000",
                "latitude": "40.251311"
            },
            "endWaypoint": {
                "longitude": "-111.686899",
                "timestamp": "20140419T213520+0000",
                "latitude": "40.334651"
            },
            "endTime": "20140419T213520+0000",
            "id": 273554,
            "startTime": "20140419T203832+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.679463",
                "timestamp": "20140419T162324+0000",
                "latitude": "40.280837"
            },
            "endWaypoint": {
                "longitude": "-111.734844",
                "timestamp": "20140419T163725+0000",
                "latitude": "40.325753"
            },
            "endTime": "20140419T163725+0000",
            "startTime": "20140419T162324+0000",
            "id": 273325,
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.711988",
                "timestamp": "20140426T005021+0000",
                "latitude": "40.332653"
            },
            "endWaypoint": {
                "longitude": "-111.709261",
                "timestamp": "20140426T005225+0000",
                "latitude": "40.325751"
            },
            "endTime": "20140426T005225+0000",
            "id": 278869,
            "startTime": "20140426T005021+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686898",
                "timestamp": "20140424T174514+0000",
                "latitude": "40.334654"
            },
            "endWaypoint": {
                "longitude": "-111.657039",
                "timestamp": "20140424T180833+0000",
                "latitude": "40.276752"
            },
            "endTime": "20140424T180833+0000",
            "startTime": "20140424T174514+0000",
            "id": 277370,
            "mileage": null
        },
        {
            "endWaypoint": {
                "longitude": "-111.686902",
                "timestamp": "20140422T195134+0000",
                "latitude": "40.334702"
            },
            "startWaypoint": {
                "longitude": "-111.759277",
                "timestamp": "20140422T193947+0000",
                "latitude": "40.364276"
            },
            "endTime": "20140422T195134+0000",
            "id": 275667,
            "startTime": "20140422T193947+0000",
            "mileage": "5.5"
        },
        {
            "endWaypoint": {
                "longitude": "-111.707027",
                "timestamp": "20140422T190930+0000",
                "latitude": "40.32749"
            },
            "startWaypoint": {
                "longitude": "-111.716848",
                "timestamp": "20140422T190400+0000",
                "latitude": "40.338756"
            },
            "endTime": "20140422T190930+0000",
            "id": 275638,
            "startTime": "20140422T190400+0000",
            "mileage": "1.2"
        },
        {
            "startWaypoint": {
                "longitude": "-111.690288",
                "timestamp": "20140424T023615+0000",
                "latitude": "40.334188"
            },
            "endWaypoint": {
                "longitude": "-111.686912",
                "timestamp": "20140424T024004+0000",
                "latitude": "40.334649"
            },
            "endTime": "20140424T024004+0000",
            "startTime": "20140424T023615+0000",
            "id": 276945,
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.68696",
                "timestamp": "20140420T143301+0000",
                "latitude": "40.334667"
            },
            "endWaypoint": {
                "longitude": "-111.960226",
                "timestamp": "20140420T161613+0000",
                "latitude": "41.67157"
            },
            "endTime": "20140420T161613+0000",
            "id": 273898,
            "startTime": "20140420T143301+0000",
            "mileage": null
        },
        {
            "endWaypoint": {
                "longitude": "-111.686888",
                "timestamp": "20140428T195150+0000",
                "latitude": "40.334692"
            },
            "startWaypoint": {
                "longitude": "-111.661192",
                "timestamp": "20140428T192245+0000",
                "latitude": "40.25795"
            },
            "endTime": "20140428T195150+0000",
            "id": 280698,
            "startTime": "20140428T192245+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686911",
                "timestamp": "20140425T034409+0000",
                "latitude": "40.334627"
            },
            "endWaypoint": {
                "longitude": "-111.697075",
                "timestamp": "20140425T034635+0000",
                "latitude": "40.333971"
            },
            "endTime": "20140425T034635+0000",
            "startTime": "20140425T034409+0000",
            "id": 277926,
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.68689",
                "timestamp": "20140424T024626+0000",
                "latitude": "40.334643"
            },
            "endWaypoint": {
                "longitude": "-111.697012",
                "timestamp": "20140424T030045+0000",
                "latitude": "40.334042"
            },
            "endTime": "20140424T030045+0000",
            "startTime": "20140424T024626+0000",
            "id": 276954,
            "mileage": null
        },
        {
            "cost": "0",
            "startWaypoint": {
                "longitude": "-111.713988",
                "timestamp": "20140430T013117+0000",
                "latitude": "40.333904"
            },
            "endWaypoint": {
                "longitude": "-111.713854",
                "timestamp": "20140430T013321+0000",
                "latitude": "40.335435"
            },
            "endTime": "20140430T013321+0000",
            "startTime": "20140430T013117+0000",
            "id": 282079,
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.70902",
                "timestamp": "20140426T193715+0000",
                "latitude": "40.326672"
            },
            "endWaypoint": {
                "longitude": "-111.730407",
                "timestamp": "20140426T194243+0000",
                "latitude": "40.350075"
            },
            "endTime": "20140426T194243+0000",
            "id": 279365,
            "startTime": "20140426T193715+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.656599",
                "timestamp": "20140419T155755+0000",
                "latitude": "40.255598"
            },
            "endWaypoint": {
                "longitude": "-111.678984",
                "timestamp": "20140419T160411+0000",
                "latitude": "40.281084"
            },
            "endTime": "20140419T160411+0000",
            "id": 273305,
            "startTime": "20140419T155755+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686885",
                "timestamp": "20140424T200836+0000",
                "latitude": "40.33468"
            },
            "endWaypoint": {
                "longitude": "-111.650783",
                "timestamp": "20140424T203103+0000",
                "latitude": "40.251743"
            },
            "endTime": "20140424T203103+0000",
            "id": 277530,
            "startTime": "20140424T200836+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.757349",
                "timestamp": "20140419T233838+0000",
                "latitude": "40.36484"
            },
            "endWaypoint": {
                "longitude": "-111.686928",
                "timestamp": "20140419T235418+0000",
                "latitude": "40.33463"
            },
            "endTime": "20140419T235418+0000",
            "id": 273724,
            "startTime": "20140419T233838+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.650734",
                "timestamp": "20140424T235139+0000",
                "latitude": "40.251806"
            },
            "endWaypoint": {
                "longitude": "-111.679064",
                "timestamp": "20140425T000636+0000",
                "latitude": "40.281175"
            },
            "endTime": "20140425T000636+0000",
            "startTime": "20140424T235139+0000",
            "id": 277736,
            "mileage": null
        },
        {
            "endWaypoint": {
                "longitude": "-111.716792",
                "timestamp": "20140422T175206+0000",
                "latitude": "40.338809"
            },
            "startWaypoint": {
                "longitude": "-111.715607",
                "timestamp": "20140422T173520+0000",
                "latitude": "40.273459"
            },
            "endTime": "20140422T175206+0000",
            "id": 275545,
            "startTime": "20140422T173520+0000",
            "mileage": "8"
        },
        {
            "startWaypoint": {
                "longitude": "-111.70699",
                "timestamp": "20140419T030251+0000",
                "latitude": "40.326777"
            },
            "endWaypoint": {
                "longitude": "-111.68691",
                "timestamp": "20140419T030803+0000",
                "latitude": "40.334626"
            },
            "endTime": "20140419T030803+0000",
            "id": 273105,
            "startTime": "20140419T030251+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.960201",
                "timestamp": "20140420T164501+0000",
                "latitude": "41.671562"
            },
            "endWaypoint": {
                "longitude": "-111.933601",
                "timestamp": "20140420T165330+0000",
                "latitude": "41.637517"
            },
            "endTime": "20140420T165330+0000",
            "id": 273963,
            "startTime": "20140420T164501+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686865",
                "timestamp": "20140419T044315+0000",
                "latitude": "40.334697"
            },
            "endWaypoint": {
                "longitude": "-111.686895",
                "timestamp": "20140419T044541+0000",
                "latitude": "40.334649"
            },
            "endTime": "20140419T044541+0000",
            "id": 273133,
            "startTime": "20140419T044315+0000",
            "mileage": null
        },
        {
            "endWaypoint": {
                "longitude": "-111.981288",
                "timestamp": "20140423T020032+0000",
                "latitude": "40.784358"
            },
            "startWaypoint": {
                "longitude": "-111.980379",
                "timestamp": "20140423T015135+0000",
                "latitude": "40.779295"
            },
            "endTime": "20140423T020032+0000",
            "id": 276037,
            "startTime": "20140423T015135+0000",
            "mileage": "2.6"
        },
        {
            "startWaypoint": {
                "longitude": "-111.70927",
                "timestamp": "20140426T005617+0000",
                "latitude": "40.32569"
            },
            "endWaypoint": {
                "longitude": "-111.722962",
                "timestamp": "20140426T005936+0000",
                "latitude": "40.327079"
            },
            "endTime": "20140426T005936+0000",
            "startTime": "20140426T005617+0000",
            "id": 278870,
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686882",
                "timestamp": "20140420T135451+0000",
                "latitude": "40.334605"
            },
            "endWaypoint": {
                "longitude": "-111.687046",
                "timestamp": "20140420T135532+0000",
                "latitude": "40.334684"
            },
            "endTime": "20140420T135532+0000",
            "id": 273891,
            "startTime": "20140420T135451+0000",
            "mileage": null
        },
        {
            "endWaypoint": {
                "longitude": "-111.722622",
                "timestamp": "20140418T003335+0000",
                "latitude": "40.327185"
            },
            "startWaypoint": {
                "longitude": "-111.686951",
                "timestamp": "20140418T002535+0000",
                "latitude": "40.334655"
            },
            "endTime": "20140418T003335+0000",
            "startTime": "20140418T002535+0000",
            "id": 272103,
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.688138",
                "timestamp": "20140428T142054+0000",
                "latitude": "40.334468"
            },
            "endWaypoint": {
                "longitude": "-111.691081",
                "timestamp": "20140428T142311+0000",
                "latitude": "40.334659"
            },
            "endTime": "20140428T142311+0000",
            "id": 280503,
            "startTime": "20140428T142054+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686813",
                "timestamp": "20140419T023924+0000",
                "latitude": "40.334671"
            },
            "endWaypoint": {
                "longitude": "-111.707055",
                "timestamp": "20140419T024441+0000",
                "latitude": "40.32676"
            },
            "endTime": "20140419T024441+0000",
            "startTime": "20140419T023924+0000",
            "id": 273090,
            "mileage": null
        },
        {
            "endWaypoint": {
                "longitude": "-111.696995",
                "timestamp": "20140423T030141+0000",
                "latitude": "40.334011"
            },
            "startWaypoint": {
                "longitude": "-111.981288",
                "timestamp": "20140423T021543+0000",
                "latitude": "40.784358"
            },
            "endTime": "20140423T030141+0000",
            "id": 276045,
            "startTime": "20140423T021543+0000",
            "mileage": "42.9"
        },
        {
            "endWaypoint": {
                "longitude": "-111.645576",
                "timestamp": "20140417T151705+0000",
                "latitude": "40.256992"
            },
            "startWaypoint": {
                "longitude": "-111.657351",
                "timestamp": "20140417T150313+0000",
                "latitude": "40.278139"
            },
            "endTime": "20140417T151705+0000",
            "id": 271563,
            "startTime": "20140417T150313+0000",
            "mileage": "3.3"
        },
        {
            "startWaypoint": {
                "longitude": "-111.686966",
                "timestamp": "20140419T132526+0000",
                "latitude": "40.334652"
            },
            "endWaypoint": {
                "longitude": "-111.651159",
                "timestamp": "20140419T134021+0000",
                "latitude": "40.249675"
            },
            "endTime": "20140419T134021+0000",
            "id": 273211,
            "startTime": "20140419T132526+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.691032",
                "timestamp": "20140428T142534+0000",
                "latitude": "40.334698"
            },
            "endWaypoint": {
                "longitude": "-111.761595",
                "timestamp": "20140428T143816+0000",
                "latitude": "40.334758"
            },
            "endTime": "20140428T143816+0000",
            "id": 280509,
            "startTime": "20140428T142534+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.757303",
                "timestamp": "20140419T180630+0000",
                "latitude": "40.364971"
            },
            "endWaypoint": {
                "longitude": "-111.660231",
                "timestamp": "20140419T183713+0000",
                "latitude": "40.237359"
            },
            "endTime": "20140419T183713+0000",
            "id": 273403,
            "startTime": "20140419T180630+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686879",
                "timestamp": "20140426T150832+0000",
                "latitude": "40.334656"
            },
            "endWaypoint": {
                "longitude": "-111.762618",
                "timestamp": "20140426T162018+0000",
                "latitude": "40.33266"
            },
            "endTime": "20140426T162018+0000",
            "id": 279138,
            "startTime": "20140426T150832+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686944",
                "timestamp": "20140418T215705+0000",
                "latitude": "40.3346"
            },
            "endWaypoint": {
                "longitude": "-111.72331",
                "timestamp": "20140418T220551+0000",
                "latitude": "40.328162"
            },
            "endTime": "20140418T220551+0000",
            "id": 272837,
            "startTime": "20140418T215705+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.722699",
                "timestamp": "20140418T015334+0000",
                "latitude": "40.327041"
            },
            "endWaypoint": {
                "longitude": "-111.71205",
                "timestamp": "20140418T015933+0000",
                "latitude": "40.33291"
            },
            "endTime": "20140418T015933+0000",
            "startTime": "20140418T015334+0000",
            "id": 272177,
            "mileage": null
        },
        {
            "endWaypoint": {
                "longitude": "-111.657391",
                "timestamp": "20140417T140107+0000",
                "latitude": "40.278122"
            },
            "startWaypoint": {
                "longitude": "-111.686907",
                "timestamp": "20140417T134326+0000",
                "latitude": "40.334655"
            },
            "endTime": "20140417T140107+0000",
            "id": 271495,
            "startTime": "20140417T134326+0000",
            "mileage": "6.5"
        },
        {
            "startWaypoint": {
                "longitude": "-111.651144",
                "timestamp": "20140429T142339+0000",
                "latitude": "40.249744"
            },
            "endWaypoint": {
                "longitude": "-111.658132",
                "timestamp": "20140429T143704+0000",
                "latitude": "40.252443"
            },
            "endTime": "20140429T143704+0000",
            "id": 281385,
            "startTime": "20140429T142339+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686914",
                "timestamp": "20140421T214406+0000",
                "latitude": "40.334613"
            },
            "endWaypoint": {
                "longitude": "-111.728732",
                "timestamp": "20140421T215927+0000",
                "latitude": "40.325812"
            },
            "endTime": "20140421T215927+0000",
            "id": 274880,
            "startTime": "20140421T214406+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686952",
                "timestamp": "20140419T235851+0000",
                "latitude": "40.334622"
            },
            "endWaypoint": {
                "longitude": "-111.657811",
                "timestamp": "20140420T001116+0000",
                "latitude": "40.300239"
            },
            "endTime": "20140420T001116+0000",
            "id": 273731,
            "startTime": "20140419T235851+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.679977",
                "timestamp": "20140425T002710+0000",
                "latitude": "40.281073"
            },
            "endWaypoint": {
                "longitude": "-111.686864",
                "timestamp": "20140425T004115+0000",
                "latitude": "40.334668"
            },
            "endTime": "20140425T004115+0000",
            "id": 277781,
            "startTime": "20140425T002710+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686925",
                "timestamp": "20140419T173152+0000",
                "latitude": "40.334672"
            },
            "endWaypoint": {
                "longitude": "-111.757312",
                "timestamp": "20140419T180624+0000",
                "latitude": "40.364968"
            },
            "endTime": "20140419T180624+0000",
            "id": 273376,
            "startTime": "20140419T173152+0000",
            "mileage": null
        },
        {
            "endWaypoint": {
                "longitude": "-111.715521",
                "timestamp": "20140422T155813+0000",
                "latitude": "40.27354"
            },
            "startWaypoint": {
                "longitude": "-111.686924",
                "timestamp": "20140422T154348+0000",
                "latitude": "40.334492"
            },
            "endTime": "20140422T155813+0000",
            "id": 275458,
            "startTime": "20140422T154348+0000",
            "mileage": "7.2"
        },
        {
            "startWaypoint": {
                "longitude": "-111.761566",
                "timestamp": "20140428T144259+0000",
                "latitude": "40.334769"
            },
            "endWaypoint": {
                "longitude": "-111.661119",
                "timestamp": "20140428T182246+0000",
                "latitude": "40.258075"
            },
            "endTime": "20140428T182246+0000",
            "id": 280515,
            "startTime": "20140428T144259+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686924",
                "timestamp": "20140424T011045+0000",
                "latitude": "40.334667"
            },
            "endWaypoint": {
                "longitude": "-111.690305",
                "timestamp": "20140424T011321+0000",
                "latitude": "40.334123"
            },
            "endTime": "20140424T011321+0000",
            "startTime": "20140424T011045+0000",
            "id": 276882,
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.697013",
                "timestamp": "20140427T014022+0000",
                "latitude": "40.334002"
            },
            "endWaypoint": {
                "longitude": "-111.686895",
                "timestamp": "20140427T014257+0000",
                "latitude": "40.334649"
            },
            "endTime": "20140427T014257+0000",
            "id": 279641,
            "startTime": "20140427T014022+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686872",
                "timestamp": "20140429T000817+0000",
                "latitude": "40.334789"
            },
            "endWaypoint": {
                "longitude": "-111.723074",
                "timestamp": "20140429T001648+0000",
                "latitude": "40.326958"
            },
            "endTime": "20140429T001648+0000",
            "id": 280980,
            "startTime": "20140429T000817+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686884",
                "timestamp": "20140429T125621+0000",
                "latitude": "40.334675"
            },
            "endWaypoint": {
                "longitude": "-111.657536",
                "timestamp": "20140429T131108+0000",
                "latitude": "40.299499"
            },
            "endTime": "20140429T131108+0000",
            "id": 281289,
            "startTime": "20140429T125621+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.723191",
                "timestamp": "20140426T001157+0000",
                "latitude": "40.327989"
            },
            "endWaypoint": {
                "longitude": "-111.712049",
                "timestamp": "20140426T001832+0000",
                "latitude": "40.332696"
            },
            "endTime": "20140426T001832+0000",
            "startTime": "20140426T001157+0000",
            "id": 278757,
            "mileage": null
        },
        {
            "endWaypoint": {
                "longitude": "-111.723486",
                "timestamp": "20140421T220518+0000",
                "latitude": "40.328076"
            },
            "startWaypoint": {
                "longitude": "-111.728716",
                "timestamp": "20140421T220245+0000",
                "latitude": "40.325867"
            },
            "endTime": "20140421T220518+0000",
            "id": 274987,
            "startTime": "20140421T220245+0000",
            "mileage": "0.4"
        },
        {
            "endWaypoint": {
                "longitude": "-111.715706",
                "timestamp": "20140429T155847+0000",
                "latitude": "40.273486"
            },
            "startWaypoint": {
                "longitude": "-111.658116",
                "timestamp": "20140429T154603+0000",
                "latitude": "40.252418"
            },
            "endTime": "20140429T155847+0000",
            "startTime": "20140429T154603+0000",
            "id": 281456,
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686863",
                "timestamp": "20140425T222302+0000",
                "latitude": "40.334646"
            },
            "endWaypoint": {
                "longitude": "-111.715618",
                "timestamp": "20140425T223004+0000",
                "latitude": "40.338723"
            },
            "endTime": "20140425T223004+0000",
            "id": 278618,
            "startTime": "20140425T222302+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.730248",
                "timestamp": "20140426T200714+0000",
                "latitude": "40.350163"
            },
            "endWaypoint": {
                "longitude": "-111.730189",
                "timestamp": "20140426T200728+0000",
                "latitude": "40.350149"
            },
            "endTime": "20140426T200728+0000",
            "id": 279388,
            "startTime": "20140426T200714+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.657734",
                "timestamp": "20140420T031539+0000",
                "latitude": "40.300272"
            },
            "endWaypoint": {
                "longitude": "-111.753596",
                "timestamp": "20140420T034125+0000",
                "latitude": "40.39253"
            },
            "endTime": "20140420T034125+0000",
            "id": 273803,
            "startTime": "20140420T031539+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.657508",
                "timestamp": "20140429T140137+0000",
                "latitude": "40.299422"
            },
            "endWaypoint": {
                "longitude": "-111.651205",
                "timestamp": "20140429T141252+0000",
                "latitude": "40.249736"
            },
            "endTime": "20140429T141252+0000",
            "id": 281360,
            "startTime": "20140429T140137+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686875",
                "timestamp": "20140428T140021+0000",
                "latitude": "40.334709"
            },
            "endWaypoint": {
                "longitude": "-111.68973",
                "timestamp": "20140428T140255+0000",
                "latitude": "40.337117"
            },
            "endTime": "20140428T140255+0000",
            "id": 280474,
            "startTime": "20140428T140021+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.753604",
                "timestamp": "20140420T051330+0000",
                "latitude": "40.392732"
            },
            "endWaypoint": {
                "longitude": "-111.686913",
                "timestamp": "20140420T055455+0000",
                "latitude": "40.334664"
            },
            "endTime": "20140420T055455+0000",
            "id": 273830,
            "startTime": "20140420T051330+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.697056",
                "timestamp": "20140425T035103+0000",
                "latitude": "40.333987"
            },
            "endWaypoint": {
                "longitude": "-111.697028",
                "timestamp": "20140425T035143+0000",
                "latitude": "40.334"
            },
            "endTime": "20140425T035143+0000",
            "id": 277932,
            "startTime": "20140425T035103+0000",
            "mileage": null
        },
        {
            "endWaypoint": {
                "longitude": "-111.686929",
                "timestamp": "20140417T010322+0000",
                "latitude": "40.334623"
            },
            "startWaypoint": {
                "longitude": "-111.686798",
                "timestamp": "20140417T005843+0000",
                "latitude": "40.33454"
            },
            "endTime": "20140417T010322+0000",
            "startTime": "20140417T005843+0000",
            "id": 271260,
            "mileage": "1.1"
        },
        {
            "startWaypoint": {
                "longitude": "-111.689715",
                "timestamp": "20140428T140742+0000",
                "latitude": "40.33719"
            },
            "endWaypoint": {
                "longitude": "-111.68735",
                "timestamp": "20140428T141041+0000",
                "latitude": "40.334582"
            },
            "endTime": "20140428T141041+0000",
            "id": 280479,
            "startTime": "20140428T140742+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.687376",
                "timestamp": "20140428T141312+0000",
                "latitude": "40.334585"
            },
            "endWaypoint": {
                "longitude": "-111.688244",
                "timestamp": "20140428T141432+0000",
                "latitude": "40.334377"
            },
            "endTime": "20140428T141432+0000",
            "id": 280494,
            "startTime": "20140428T141312+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686872",
                "timestamp": "20140419T003615+0000",
                "latitude": "40.334666"
            },
            "endWaypoint": {
                "longitude": "-111.686869",
                "timestamp": "20140419T003623+0000",
                "latitude": "40.334664"
            },
            "endTime": "20140419T003623+0000",
            "id": 272980,
            "startTime": "20140419T003615+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.933571",
                "timestamp": "20140420T165404+0000",
                "latitude": "41.637514"
            },
            "endWaypoint": {
                "longitude": "-111.933578",
                "timestamp": "20140420T165418+0000",
                "latitude": "41.637517"
            },
            "endTime": "20140420T165418+0000",
            "id": 273967,
            "startTime": "20140420T165404+0000",
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.723319",
                "timestamp": "20140418T234208+0000",
                "latitude": "40.328178"
            },
            "endWaypoint": {
                "longitude": "-111.686917",
                "timestamp": "20140418T235454+0000",
                "latitude": "40.334635"
            },
            "endTime": "20140418T235454+0000",
            "startTime": "20140418T234208+0000",
            "id": 272925,
            "mileage": null
        },
        {
            "endWaypoint": {
                "longitude": "-111.686921",
                "timestamp": "20140417T154034+0000",
                "latitude": "40.334648"
            },
            "startWaypoint": {
                "longitude": "-111.645536",
                "timestamp": "20140417T152636+0000",
                "latitude": "40.257031"
            },
            "endTime": "20140417T154034+0000",
            "id": 271590,
            "startTime": "20140417T152636+0000",
            "mileage": "8.1"
        },
        {
            "startWaypoint": {
                "longitude": "-111.713997",
                "timestamp": "20140418T185420+0000",
                "latitude": "40.333988"
            },
            "endWaypoint": {
                "longitude": "-111.686963",
                "timestamp": "20140418T185939+0000",
                "latitude": "40.334643"
            },
            "endTime": "20140418T185939+0000",
            "startTime": "20140418T185420+0000",
            "id": 272649,
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.696877",
                "timestamp": "20140424T033936+0000",
                "latitude": "40.33396"
            },
            "endWaypoint": {
                "longitude": "-111.686947",
                "timestamp": "20140424T034226+0000",
                "latitude": "40.334599"
            },
            "endTime": "20140424T034226+0000",
            "startTime": "20140424T033936+0000",
            "id": 276967,
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.686975",
                "timestamp": "20140427T012324+0000",
                "latitude": "40.334629"
            },
            "endWaypoint": {
                "longitude": "-111.696973",
                "timestamp": "20140427T012552+0000",
                "latitude": "40.333996"
            },
            "endTime": "20140427T012552+0000",
            "startTime": "20140427T012324+0000",
            "id": 279630,
            "mileage": null
        },
        {
            "startWaypoint": {
                "longitude": "-111.651181",
                "timestamp": "20140419T155302+0000",
                "latitude": "40.24965"
            },
            "endWaypoint": {
                "longitude": "-111.656633",
                "timestamp": "20140419T155555+0000",
                "latitude": "40.255528"
            },
            "endTime": "20140419T155555+0000",
            "id": 273296,
            "startTime": "20140419T155302+0000",
            "mileage": null
        }
        ],

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
