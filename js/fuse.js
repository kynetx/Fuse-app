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

            renderHeader: function() {
                Fuse.log(this.header);
            },

            renderFooter: function() {
                Fuse.log(this.footer);
            },

            render: function() {
                Fuse.log("Fuse base view class is now rendering view: ", this, " with arguments: ", arguments);
                this.renderHeader();
                this.renderFooter();
                this.removeDups();
                this.addToDOM();
                this.enhance();
                this.show();
            },

            removeDups: function() {
                if (this.$el.length) {
                    // detach keeps jQuery data and event handlers around 
                    // while removing it from the DOM. 
                    this.$el.detach();
                }
            },

            addToDOM: function() {
                $(document).append(this.$el);
            },

            enhance: function() {
                this.$el.page();
            },

            show: function() {
                $.mobile.changePage(this.$el, {
                    transition: this.transition,
                    // Backbone is managing hash listening for us so we don't want 
                    // jQM to mess with it.
                    changeHash: false
                })
            }
        }),

        init: function() {
            // tell Backbone to start listening for hashchanges.
            Backbone.history.start();
            // start jQuery Mobile.
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
