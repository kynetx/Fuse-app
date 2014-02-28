require(["fuse", "cloudos", "jquery", "routers/app.router", "routers/vehicles.router", "jquerymobile"], function(Fuse, CloudOS, $, AppRouter, VehiclesRouter) {
	// setup the routers
	Fuse.routers = {};
	Fuse.routers.AppRouter = new AppRouter();
	Fuse.routers.VehiclesRouter = new VehiclesRouter();
	// this is used for prefiltering Fuse.show() requests. Mainly for early-stage development and probably
	// a good idea to remove later.
	Fuse.routes = Object.keys(_.extend(Fuse.routers.AppRouter.routes, Fuse.routers.VehiclesRouter.routes));
	// remove this for production.
	Fuse.logging = true;

	// setup dummy data. Will eventually come from API obviously.
	Fuse.FIXTURES = {
		"vehicles": [{
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
			"lastWaypoint": {
				"timestamp": "20140116T152440+0000",
				"latitude": 28.088505,
				"longitude": -82.578467
			},
			"timestamp": "20140116T151952+0000",
			"running": false,
			"fuelRate": 1.2,
			"fuelLevel" : 20,
			"coolantTemperature": 163,
			"batteryVoltage": 13.2,
			"odometer": 65345,
			"header": 272,
			"speed": 72
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
			"lastWaypoint": {
				"timestamp": "20140116T152440+0000",
				"latitude": 28.088505,
				"longitude": -82.578467
			},
			"timestamp": "20140116T151952+0000",
			"running": false,
			"fuelRate": 1.2,
			"fuelLevel" : 20,
			"coolantTemperature": 163,
			"batteryVoltage": 13.2,
			"odometer": 65345,
			"header": 272,
			"speed": 72
		},
		{
			"id": "VN0E",
			"vin": "Y257JX9AXQDXI529",
			"nickname": "Tanya",
			"year": "1998",
			"make": "Ford",
			"model": "Fiesta",
			"icon": "http://motorreview.com/wp-content/uploads/2013/12/2014-Ford-Fiesta-SE-12-of-28.jpg",
			"notes": "Labore consectetur et proident veniam mollit. In minim reprehenderit proident et. Elit fugiat cillum sit cillum quis. Elit ad ullamco velit laborum amet exercitation ea. Nisi ea nostrud ullamco ipsum magna consequat id qui",
			"mileage": 84519,
			"lastWaypoint": {
				"timestamp": "19925606T185601T+07:00",
				"latitude": 9.308106,
				"longitude": -78.813817
			},
			"timestamp": "19910831T060849T+07:00",
			"running": false,
			"fuelRate": 2.63,
			"fuelLevel": 22,
			"coolantTemperature": 95,
			"batteryVoltage": 73.4,
			"odometer": 19725,
			"heading": 270,
			"speed": 24
		}],

		"trips": {}
	};

	Fuse.menu = [{
		action: "profile",
		text: "Profile"
	},
	{
		action: "preferences",
		text: "Preferences"
	},
	{
		action: "alerts",
		text: "Alerts"
	},
	{
		action: "vehicles",
		text: "Vehicles"
	},
	{
		action: "trips",
		text: "Trips"
	},
	{
		action: "maintenance",
		text: "Maintenance"
	},
	{
		action: "carpool",
		text: "Carpool",
	},
	{
		action: "store",
		text: "Store"
	},
	{
		action: "support",
		text: "Support",
	},
	{
		action: "logout",
		text: "Logout"
	}];
	
	// start the app.
	Fuse.init();
});
