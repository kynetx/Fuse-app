define(["backbone", "jquery", "underscore", "routers/app.router", "routers/vehicles.router"], function(Backbone, $, _, AppRouter, VehiclesRouter) {
    return {
        routers: {
            AppRouter: new AppRouter(),
            VehiclesRouter: new VehiclesRouter()
        },
        View: Backbone.View.extend({
            // this initalize function will be overriden by the inheriting views
            initialize: function() {
                _.bindAll();
                this.render();
            },

            render: function() {
                this.renderHeader();
                this.renderFooter();
                this.mobilize();
                this.
            },

            renderHeader: function() {
                this.go();
            },

            renderFooter: function() {
            },

            // does neccesary housekeeping 
            mobilize: function() {
            }
        })
    };
});
