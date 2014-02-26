require(["fuse", "cloudos", "jquery", "routers/app.router", "routers/vehicles.router", "jquerymobile"], function(Fuse, CloudOS, $, AppRouter, VehiclesRouter) {
	// setup the routers
	Fuse.routers = {};
	Fuse.routers.AppRouter = new AppRouter();
	Fuse.routers.VehiclesRouter = new VehiclesRouter();
	// remove this for production.
	Fuse.logging = true;

	// setup dummy data. Will eventually come from API obviously.
	Fuse.data = {
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
			"vin": "FAKE_VIN",
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
			"id": "VTVB",
			"vin": "FAKE_VIN",
			"nickname" : "Speedy",
			"year" : "2005",
			"make" : "Lexus",
			"model" : "IS",
			"icon" : "http://upload.wikimedia.org/wikipedia/commons/6/61/Lexus_IS250_silver.jpg",
			"notes" : "I love this truck!",
			"mileage": 280000,
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
		},
		{
			"id": "VZDQ",
			"vin": "GR1X7C42YMTGWRK9",
			"nickname": "Christi",
			"year": "2006",
			"make": "Lincoln",
			"model": "Town Car",
			"icon": "http://upload.wikimedia.org/wikipedia/commons/a/a3/90-92_Lincoln_Town_Car.jpg",
			"notes": "Ea sit amet sit consectetur consectetur elit occaecat. Laborum tempor Lorem sint enim laboris ex ea magna est. Sunt aliquip do excepteur et cillum deserunt laborum deserunt. Minim dolore officia consequat anim occaecat. Consequat veniam pariatur non amet ullamco officia occaecat officia",
			"mileage": 215118,
			"lastWaypoint": {
				"timestamp": "19941122T121114T+06:00",
				"latitude": 51.974861,
				"longitude": -83.865895
			},
			"timestamp": "20050812T020854T+06:00",
			"running": true,
			"fuelRate": 33.79,
			"fuelLevel": 73,
			"coolantTemperature": 89,
			"batteryVoltage": 9.5,
			"odometer": 176687,
			"heading": 314,
			"speed": 80
		},
		{
			"id": "V0FF",
			"vin": "L48FMIQAV8V3G14I",
			"nickname": "Alicia",
			"year": "1993",
			"make": "Acura",
			"model": "MDX",
			"icon": "http://upload.wikimedia.org/wikipedia/commons/7/70/2007_Acura_MDX_--_NHTSA.jpg",
			"notes": "Voluptate quis ad fugiat adipisicing id culpa aute. Eu cupidatat non deserunt ea cupidatat pariatur laborum. Nulla nisi nulla est aute veniam anim exercitation occaecat. Est occaecat nisi id duis amet aute cillum magna non in magna. Deserunt voluptate duis cupidatat mollit culpa",
			"mileage": 297695,
			"lastWaypoint": {
				"timestamp": "20071515T191524T+07:00",
				"latitude": 7.115719,
				"longitude": 38.338885
			},
			"timestamp": "19952030T212026T+06:00",
			"running": true,
			"fuelRate": 69.06,
			"fuelLevel": 77,
			"coolantTemperature": 11,
			"batteryVoltage": 16.7,
			"odometer": 237280,
			"heading": 131,
			"speed": 95
		},
		{
			"id": "VRBL",
			"vin": "WQ7JZ1RI5MJF9A4I",
			"nickname": "Johnnie",
			"year": "2008",
			"make": "BMW",
			"model": "x1",
			"icon": "http://www.themotorreport.com.au/content/image/2/0/2013_bmw_x1_update_australian_launch_01_1-1127.jpg",
			"notes": "Exercitation non pariatur excepteur do nostrud duis pariatur. Mollit eiusmod voluptate dolore proident. Pariatur labore in pariatur dolor magna mollit cupidatat laboris anim. Eu culpa nulla tempor consectetur nisi fugiat culpa pariatur laborum elit velit velit. Veniam quis reprehenderit ex Lorem eiusmod eu do proident non",
			"mileage": 234980,
			"lastWaypoint": {
				"timestamp": "20120917T100940T+06:00",
				"latitude": 17.778565,
				"longitude": 24.054376
			},
			"timestamp": "19943427T043405T+06:00",
			"running": true,
			"fuelRate": 12.84,
			"fuelLevel": 19,
			"coolantTemperature": 93,
			"batteryVoltage": 8.8,
			"odometer": 12950,
			"heading": 143,
			"speed": 29
		},
		{
			"id": "VYHB",
			"vin": "TFANAWA8M2T9",
			"nickname": "Margret",
			"year": "2011",
			"make": "Mercedes",
			"model": "CLA",
			"icon": "http://upload.wikimedia.org/wikipedia/commons/7/70/2007_Acura_MDX_--_NHTSA.jpg",
			"notes": "Sunt consequat anim consectetur et veniam labore. Commodo tempor non ex officia deserunt dolore consectetur et dolor aliqua esse proident. Deserunt anim cupidatat est sit pariatur do amet pariatur exercitation sunt. Deserunt sunt non eu in minim laborum anim velit dolor excepteur enim proident duis laborum. Ex consequat nostrud aute dolore magna",
			"mileage": 36543,
			"lastWaypoint": {
				"timestamp": "19903126T043102T+06:00",
				"latitude": 72.385794,
				"longitude": 1.657693
			},
			"timestamp": "20020719T070741T+06:00",
			"running": false,
			"fuelRate": 91.69,
			"fuelLevel": 70,
			"coolantTemperature": 60,
			"batteryVoltage": 24.2,
			"odometer": 138134,
			"heading": 353,
			"speed": 56
		},
		{
			"id": "V6XL",
			"vin": "IQ0ZKHS31899HPVI",
			"nickname": "Kristie",
			"year": "2011",
			"make": "Scion",
			"model": "FR-S",
			"icon": "http://upload.wikimedia.org/wikipedia/commons/7/73/Mercedes-Benz_CLA_200_AMG_Line_(C_117)_%E2%80%93_Frontansicht,_10._Juli_2013,_M%C3%BCnster.jpg",
			"notes": "Nulla ipsum officia ut do fugiat occaecat aliqua eu occaecat nisi aliquip. Ullamco nostrud esse ea occaecat minim consequat laborum sint ullamco. Occaecat aliquip consectetur exercitation ex consectetur sunt sint magna eu veniam eu. Dolor pariatur esse consequat irure in cupidatat consequat ipsum reprehenderit ullamco ullamco velit. Cupidatat officia tempor eiusmod dolor",
			"mileage": 67703,
			"lastWaypoint": {
				"timestamp": "19932824T092844T+07:00",
				"latitude": 91.321963,
				"longitude": 67.63839
			},
			"timestamp": "19890311T220300T+06:00",
			"running": true,
			"fuelRate": 29.98,
			"fuelLevel": 36,
			"coolantTemperature": 65,
			"batteryVoltage": 71.9,
			"odometer": 115733,
			"heading": 248,
			"speed": 15
		},
		{
			"id": "VBCO",
			"vin": "FJ7S6WZEN9L4BO6R",
			"nickname": "Luz",
			"year": "2013",
			"make": "Lexus",
			"model": "GX 460",
			"icon": "http://media.caranddriver.com/images/11q4/433547/2013-scion-fr-s-photo-433682-s-1280x782.jpg",
			"notes": "Qui minim laborum est irure nostrud minim Lorem occaecat ut commodo Lorem et fugiat. Excepteur proident est quis pariatur qui. Qui officia culpa duis Lorem voluptate ea officia ipsum excepteur sit nisi. Enim sint laborum ex eu Lorem. Nostrud elit amet voluptate mollit qui non fugiat fugiat tempor ullamco culpa eu",
			"mileage": 85521,
			"lastWaypoint": {
				"timestamp": "20045702T025725T+06:00",
				"latitude": 99.908546,
				"longitude": -13.121822
			},
			"timestamp": "20083223T133234T+07:00",
			"running": true,
			"fuelRate": 73.1,
			"fuelLevel": 11,
			"coolantTemperature": 7,
			"batteryVoltage": 58.5,
			"odometer": 145159,
			"heading": 234,
			"speed": 85
		}],

		"trips": {}
	};

	// start the app.
	Fuse.init();
});
