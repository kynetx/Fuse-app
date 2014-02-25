define(["backbone", "jquery", "underscore", "text!templates/headerTmpl.html", "text!templates/contentTmpl.html", "text!templates/footerTmpl.html"], function(Backbone, $, _, headerTmpl, contentTmpl, footerTmpl) {
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

            headerTemplate: _.template(headerTmpl),
            footerTemplate: _.template(footerTmpl),
            contentTemplate: _.template(contentTmpl),

            renderHeader: function() {
                this.$el.prepend(this.headerTemplate({header: this.header}));
            },

            renderFooter: function() {
                this.$el.append(this.footerTemplate({footer: this.footer}));
            },

            renderContent: function() {
                this.$el.append(this.contentTemplate({content: this.content}));
            },

            render: function() {
                Fuse.log("Fuse base view class is now rendering view: ", this, " with arguments: ", arguments);
                this.renderHeader();
                this.renderContent();
                this.renderFooter();
                this.removeDups();
                this.addToDOM();
                this.enhance();
                var __self__ = this;
                $(document).on("pageinit", function() {
                    __self__.show();
                });
            },

            removeDups: function() {
                if (this.$el.length) {
                    // detach keeps jQuery data and event handlers around 
                    // while removing it from the DOM. 
                    this.$el.detach();
                }
            },

            addToDOM: function() {
                $(document.body).append(this.$el);
            },

            enhance: function() {
                this.$el.attr("data-role", this.role);
                this.$el.page();
            },

            show: function() {
                $.mobile.changePage(this.$el, {
                    transition: this.transition,
                    role: this.role,
                    changeHash: false
                });
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
            return this.logging && console && console.log && Function.apply.call(console.log, console, arguments);
        }
    };

    // since backbone has already written a great extend function, lets just reuse it in our controller.
    Fuse.Controller.extend = Backbone.Model.extend;

    return Fuse;
});
