define(["backbone", "jquery", "underscore", "routers/app.router", "routers/vehicles.router"], function(Backbone, $, _, AppRouter, VehiclesRouter) {
    return {
        AppRouter: new AppRouter(),
        VehiclesRouter: new VehiclesRouter()
    };
});
