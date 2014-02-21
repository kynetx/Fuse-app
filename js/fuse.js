define(["backbone", "jquery", "underscore"], function(Backbone, $, _) {
    return {
        // not any special functionality now but maybe later.
        Router: Backbone.Router.extend({}),

        Model: Backbone.Model.extend({}),

        Controller: {
            // just use the extend method already defined by backbone.
            extend: Backbone.Router.extend;
        }

        View: Backbone.View.extend({
            // this initalize function will be overriden by the inheriting views
            initialize: function() {
                _.bindAll();
                this.render();
            },

            render: function() {
                
            },

            // does neccesary housekeeping 
            mobilize: function() {
            }
        }),

        history: Backbone.History.extend({});

        init: function() {
            this.history.start();
        }
    };
});
