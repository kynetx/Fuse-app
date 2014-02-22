require(["fuse", "cloudos", "jquery", "routers/app.router", "routers/vehicles.router", "jquerymobile"], function(Fuse, CloudOS, $, AppRouter, VehiclesRouter) {
	// setup the routers
	Fuse.routers = {};
	Fuse.routers.AppRouter = new AppRouter();
	Fuse.routers.VehiclesRouter = new VehiclesRouter();
	Fuse.init();
});
