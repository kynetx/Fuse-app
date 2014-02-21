require(["backbone", "cloudos", "jquery", "fuse", "jquerymobile"], function(Backbone, CloudOS, $, Fuse) {
	// setup the routers
	Fuse.routers = {};
	Fuse.routers.AppRouter = new AppRouter();
	Fuse.routers.VehiclesRouter = new VehiclesRouter();
	Fuse.init();
});
