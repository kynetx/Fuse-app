define(["backbone", "jquery", "underscore"], function(Backbone, $, _) {
    var Fuse = {
        // not any special functionality now but maybe later.
        Router: Backbone.Router.extend({}),

        Model: Backbone.Model.extend({}),

        Controller: function() {
            // we don't really have any instance properties here yet.
        },

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

        init: function() {
            Backbone.history.start();
            $.mobile.initializePage();
        },

        logging: true,

        log: function() {
            if (console && console.log && this.logging) {
                console.log(arguments)
            }
        }
    };

    // since backbone has already written a great extend function, lets just reuse it in our controller.
    Fuse.Controller.extend = Backbone.Model.extend;

    return Fuse;
});
