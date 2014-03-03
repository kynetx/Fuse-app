define(["backbone", "jquery", "underscore", "vendor/google.maps", "text!templates/headertmpl.html", "text!templates/contenttmpl.html", "text!templates/footertmpl.html", "text!templates/menutmpl.html", "text!templates/maptmpl.html"], function(Backbone, $, _, Maps, headerTmpl, contentTmpl, footerTmpl, menuTmpl, mapTmpl) {
    var Fuse = {
        VERSION: "0.0.0",
        // not any special functionality now but maybe later.
        Router: Backbone.Router.extend({}),

        Model: Backbone.Model.extend({}),

        Controller: function() {
            // we don't really have any instance properties here yet.
        },

        View: Backbone.View.extend({
            // this initalize function will be overriden by the inheriting views.
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
                this.$el.append(this.footerTemplate());
            },

            renderContent: function() {
                this.$el.append(this.contentTemplate({content: this.content}));
            },

            render: function() {
                Fuse.log("Rendering view:", this);
                this.renderHeader();
                this.renderContent();
                this.renderFooter();
                this.removeDups();
                this.addToDOM();
                this.showWhenReady();
                this.enhance();
            },

            removeDups: function() {
                var targetElements = ["#" + this.el.id];
                var dups = $(targetElements.join());
                if (dups.length) {
                    // reset the map back to its starting location.
                    Fuse.map.reset();
                    // detach keeps jQuery data and event handlers around 
                    // while removing it from the DOM. 
                    dups.detach();
                }
            },

            addToDOM: function() {
                $(document.body).append(this.$el);
            },

            showWhenReady: function() {
                var __self__ = this;
                $(this.$el).on("pagecreate", function(e) {
                    __self__.show();
                }); 
            },

            enhance: function() {
                if (this.map) {
                    Fuse.map.configure(this.map);
                }
                this.$el.attr("data-role", this.role);
                this.$el.page();

                // if jQM hasn't been initalized, then initalize it, otherwise nothing will work.
                // should only happen once.
                // choosing for ourselves when jQM inializes prevents jQM from trying to show a 
                // landing page that we don't want.
                if (!Fuse.isInitialized()) {
                    $.mobile.initializePage();
                }
            },

            show: function() {
                $.mobile.changePage(this.$el, {
                    transition: this.transition,
                    role: this.role,
                    changeHash: false
                });
            }
        }),

        menuTemplate: _.template(menuTmpl),
        mapTemplate: _.template(mapTmpl),

        map: {
            overlays: [],
            listeners: [],
            infoWindow: new Maps.InfoWindow(),

            reset: function() {
                // set the height and width to zero and move it to the beginning of the body.
                this.$el.css({
                    height: 0,
                    width: 0
                }).prependTo(document.body);
                // remove all event listeners.
                while (this.listeners.length) {
                    var listener = this.listeners.pop();
                    Fuse.log("Removing listener:", listener, "from map:", this);
                    Maps.event.removeListener(listener);
                }
                // remove all overlays.
                while (this.overlays.length) {
                    var overlay = this.overlays.pop();
                    Fuse.log("Removing overlay:", overlay, "from map:", this);
                    overlay.setMap(null);
                }

                if (this.bounds) {
                    delete this.bounds;
                }

                Fuse.log("Reset Fuse map. Fuse map object after reset:", this);
            },

            configure: function(config) {
                Fuse.log("Configuring Fuse map:", config);
                if (!config) {
                    Fuse.log("Invalid map configuration:", config);
                    return;
                }

                // reset the map.
                this.reset();

                // set it up.
                // give it a width and a height & move it to the appropriate location.
                var $container = $(config.container);
                // use the explicitly passed width and height, if given them,
                // otherwise use the container's dimensions.
                var height = config.height || $container.height();
                if (height < 300) {
                    Fuse.log("Map height (", height, ") is too small. Padding by 300px.");
                    height += 300;
                }
                var width = config.width || $container.width();
                this.$el.css({
                    height: height,
                    width: width
                }).appendTo($container);
                // setup bounds.
                this.bounds = new Maps.LatLngBounds();
                // add overlays, if any.
                if (config.overlays) {
                    while (config.overlays.length) {
                        this.addOverlay(config.overlays.pop());
                    }
                }
                // tell the map to respect our bounds object.
                this.obj.fitBounds(this.bounds);
                // set the zoom level on the map.
                this.obj.setZoom(this.obj.getZoom() - 3);
            },

            addOverlay: function(overlay) {
                var googOverlay;
                // if the overlay is a google maps marker.
                if (overlay.infowindow) {
                    var animation;
                    if (!overlay.animation || overlay.animation.toUpperCase() === "DROP") {
                        animation = Maps.Animation.DROP;
                    } else {
                        animation = Maps.Animation.BOUNCE;
                    }
                    var position = new Maps.LatLng(overlay.position.latitude, overlay.position.longitude);
                    googOverlay = new Maps.Marker({
                        position: position,
                        title: overlay.title,
                        animation: animation
                    });
                }
                Fuse.log("Adding overlay:", googOverlay, "to map:", this);
                // add the overlay to the map.
                googOverlay.setMap(this.obj);
                // extend the bounds object to include this marker position.
                this.bounds.extend(position);
                // keep track of this overlay so we can remove it later.
                this.overlays.push(overlay);
            }
        },

        initMenu: function() {
            this.log("Initializing menu.");
            var __self__ = this;
            // populate menu items.
            var menu = this.menuTemplate({items: this.menu});
            $(document.body).append(menu);
            // setup handler for menu.
            $("#menu").on("tap", "a", function(e) {
                var action = $(e.target).data("action");
                if (action === "close") {
                    $("#menu").panel("close");
                } else {
                    __self__.show($(e.target).data("action"));
                }
                e.handled = true;
            });
            
            // initialize the panel and listview widgets.
            $("#menu").panel();
            $("#menu ul:eq(0)").listview();
            // setup toggle handler.
            $(document).on("tap", "#open-menu", function(e) {
                Fuse.log("opening menu...");
                $("#menu").panel("open");
                e.handled = true;
            }); 
        },

        initMap: function() {
            this.log("Initializing map.");
            $(document.body).prepend(this.mapTemplate());
            this.map.$el = $("#fuse-map");
            // google maps expects the raw DOM element so we 
            // extract it out of the jQuery object using .get().
            this.map.el = this.map.$el.get(0);
            this.map.obj = new Maps.Map(this.map.el, {
                mapTypeId: Maps.MapTypeId.ROADMAP
            });
        },

        preventGhostTaps: function() {
            $(document).on("tap", function(e) {
                if (e.handled) {
                    // make the event die a horrible death.
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                }
            })
        },

        init: function() {
            // setup application menu.
            this.initMenu();
            // add reusable map container to page.
            this.initMap();
            // prevent ghost taps.
            this.preventGhostTaps();
            // tell Backbone to start listening for hashchanges.
            Backbone.history.start();
        },

        isInitialized: function() {
            // TODO: is this really the best way to determine if jQM is initialized?
            return $("body").hasClass("ui-mobile-viewport");
        },

        show: function(to, options) {
            var page = "";
            if (options && options.id) {
                page = to + "/" + options.id;
                this.log("Attempting to show page:", to, " with options:", options);
            } else {
                page = to;
                this.log("Attempting to show page:", to);
            }

            // if are already on the requested page, do nothing.
            if (Backbone.history.fragment === page) {
                this.log("Already on requested page! (", page, ") Not doing anything.");
            } else if (!options && this.routes && this.routes.indexOf(page) < 0) {
                // if no routes match, do nothing. 
                // Primarily for menu use case, hence we don't bother checking routes with options.
                this.log ("No routes match requested page. Not doing anything.");
            } else {
                Backbone.history.navigate(page, true);
            }
        },

        logging: false,

        log: function() {
            // this is a console.log wrapper written by AKO that uses javascript awesomeness to emulate exact behavior
            // of console.log() but with the bonus of having it be easily disableable. (Remove line in main.js where Fuse.logging = true);
            return this.logging && console && console.log && 
            Function.prototype.apply.call(console.log, console, ["Fuse v"+ this.VERSION +":"].concat(Array.prototype.slice.call(arguments)));
        }
    };

    // since backbone has already written a great extend function, lets just reuse it in our controller.
    Fuse.Controller.extend = Backbone.Model.extend;

    return Fuse;
});
