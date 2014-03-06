define(["backbone", "jquery", "underscore", "vendor/google.maps", "text!templates/headertmpl.html", "text!templates/contenttmpl.html", "text!templates/footertmpl.html", "text!templates/menutmpl.html", "text!templates/maptmpl.html"], function(Backbone, $, _, Maps, headerTmpl, contentTmpl, footerTmpl, menuTmpl, mapTmpl) {
    var Fuse = {
        VERSION: "0.0.1",
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
                var tmplParams = {
                    content: this.content
                };

                if (!!this.contentClass) {
                    tmplParams["contentClass"] = this.contentClass;
                }

                this.$el.append(this.contentTemplate(tmplParams));
            },

            render: function() {
                Fuse.log("Rendering view:", this);
                // if the view has a model or collection, tell the 
                // view to re-render when the backing data changes.
                // this means we only need to create collections and models
                // once and then update the data and the views will automatically
                // re-render.
                if (this.collection) {
                    this.collection.on("change", this.render, this);
                    this.collection.on("add", this.render, this);
                    this.collection.on("remove", this.render, this);
                }
                if (this.model) {
                    this.model.on("change", this.render, this);
                }

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
                // if there is a map configuration, configure the map with it.
                if (!!this.map) {
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
            // overlay types
            OverlayTypeId: {
                MARKER: 0,
                DIRECTIONS: 1
            },

            overlays: [],
            listeners: [],
            infoWindow: new Maps.InfoWindow(),

            reset: function() {
                var $body = $(document.body);
                // if the container is set to the body already, we don't need to do anything.
                if ($body.is(this.$container)) {
                    Fuse.log("Aborting map reset attempt. Map already reset.");
                    return;
                }
                // reset width and height and prepend it back to the body.
                this.height = 0;
                this.width = 0;
                this.$container = $body;
                this.adjust();
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

                Fuse.log("Reset Fuse map:", this);
            },

            adjust: function() {
                this.$el.css({
                    height: this.height,
                    width: this.width
                }).prependTo(this.$container);
                // tell google maps to trigger a resize event on our map
                // object so the new configuration and position takes effect.
                Maps.event.trigger(this.obj, "resize");   
            },

            configure: function(config) {
                this.reset();
                Fuse.log("Map configuration:", config);
                if (!config) {
                    Fuse.log("Invalid map configuration:", config);
                    return;
                }

                // set up the maps container, height, width, and then adjust the map
                // element given the new configuration.
                this.$container = $(config.container);
                // use the explicitly passed width and height if given,
                // otherwise use the container's dimensions.
                this.height = config.height || this.$container.height();
                // if the map height is less than 300px, pad it by 500px.
                if (this.height < 300) {
                    Fuse.log("Map height (", this.height, ") is too small. Padding by 500px.");
                    this.height += 300;
                }

                // add 25 pixels to the width for good measure (to beat jQM styling...arghh!!).
                this.width = (config.width || this.$container.width()) + 25;
                // adjust the map to the new configuration.
                this.adjust();
                // setup bounds.
                this.bounds = new Maps.LatLngBounds();
                // add overlays, if any.
                if (config.overlays) {
                    while (config.overlays.length) {
                        this.addOverlay(config.overlays.pop());
                    }
                }

                // set the context for the fitter function to Fuse.map (this).
                var fitter = $.proxy(function() {
                    Fuse.log("Fitting map.");
                    this.obj.fitBounds(this.bounds);
                    this.obj.setZoom(this.obj.getZoom() - 1);
                }, this);

                // give the map sufficient time to be setup before asking it to be fitted
                // to our bounds and zoom level. Tried binding to events triggered by the map
                // but they were unreliable for determining when the map was ready. So, just to be 
                // safe we simply give it 132 milliseconds to initialize itself, which appears
                // to be about the amount of time it takes for the map to finish setting itself
                // up.
                setTimeout(fitter, 132);
            },

            addOverlay: function(overlay) {
                var googOverlay;
                // if the overlay is a marker.
                if (this.OverlayTypeId.MARKER === overlay.type) {
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
                this.overlays.push(googOverlay);
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

        initFooter: function() {
            var showPageFromFooter = $.proxy(function(e) {
                var action = $(e.target).data("action");
                this.show(action);
                e.handled = true;
            }, this);
            $(document).on("tap", ".fuse-footer-container > a", showPageFromFooter);
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

        initTooltips: function() {
            // this is somewhat of a hack until I can finish a stable
            // patch of the tooltipster() plugin which allows 
            // for adding tooltipster functionality to dynamically-added
            // elements.
            $(document).on("mouseenter", "[title]", function() {
                $(this).tooltipster();
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
            // setup footer.
            this.initFooter();
            // add reusable map container to page.
            this.initMap();
            // inialize tooltip plugin.
            this.initTooltips();
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
