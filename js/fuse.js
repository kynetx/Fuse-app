define(["backbone", "jquery", "underscore", "routers/app.router", "routers/vehicles.router"], function(Backbone, $, _, AppRouter, VehiclesRouter) {
    return {
        routers: {
            AppRouter: new AppRouter(),
            VehiclesRouter: new VehiclesRouter()
        },
        View: Backbone.View.extend({
            initialize: function() {
                _.bindAll();
                this.render();
            },

            events: {
                // none for now...
            },

            render: function() {
                this.renderHeader();
                this.renderFooter();
            },

            // does neccesary housekeeping 
            mobilize: function() {
            }
        })
    };
});
