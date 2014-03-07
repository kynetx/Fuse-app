define(["backbone", "jquery", "underscore", "vendor/google.maps", "text!templates/headertmpl.html", "text!templates/contenttmpl.html", "text!templates/footertmpl.html", "text!templates/menutmpl.html", "text!templates/maptmpl.html"], function(Backbone, $, _, Maps, headerTmpl, contentTmpl, footerTmpl, menuTmpl, mapTmpl) {
    var Fuse = {
        VERSION: "0.0.1",
        Router: Backbone.Router.extend({
            initialize: function() {
                this.on("route", this.addRouteToHistory, this);
            },

            addRouteToHistory: function(name, args) {
                Fuse.history.push({
                    name: name,
                    args: args,
                    fragment: Backbone.history.fragment
                });
                Fuse.log(Fuse.history);
            }
        }),

        Model: Backbone.Model.extend({}),

        Controller: function() {
            // call our constructor.
            if (typeof this.init === "function") {
                this.init();
            }
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
                Fuse.log("Rendering header.");
                this.$el.append(this.headerTemplate({header: this.header}));
            },

            renderFooter: function() {
                Fuse.log("Rendering footer.");
                this.$el.append(this.footerTemplate());
            },

            renderContent: function() {
                Fuse.log("Rendering content.");
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

                this.cleanup();
                this.renderHeader();
                this.renderContent();
                this.renderFooter();
                this.addToDOM();
                this.showWhenReady();
                // if there is a map configuration,
                // setup the map with the provided configuration
                // and show it when ready.
                if (this.map) {
                    this.showMapWhenReady();
                }
                this.enhance();
            },

            cleanup: function() {
                Fuse.map.reset();
                var targetElements = ["#" + this.el.id];
                var dups = $(targetElements.join());
                if (dups.length) {
                    // remove the duplicate(s) from the DOM but don't throw
                    // away their attached data or events.
                    // note : detach() is needed because otherwise jQM starts to 
                    // throw a very large and angry fit if you just go full throttle
                    // and .remove() elements.
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

            showMapWhenReady: function() {
                var configureMap = $.proxy(function() {
                    Fuse.map.configure(this.map);
                }, this);

                this.$el.on("pageshow", configureMap);
            },

            enhance: function() {
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
            // this is used to offset the default google maps zoom level
            // in case we don't have enough markers/overlays for the default
            // zoom level to make sense. 3 seems to be a reasonable ceiling for
            // the number of overlays needed for the default google maps zoom 
            // to look good. So when there are less than 3 markers/overlays
            // on the map, we make use of the zoom offfset, otherwise it's ignored.
            MAX_ZOOM_OFFSET: 4,
            MIN_ZOOM_OFFSET: 2,

            MIN_OVERLAYS: 3,

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

                // reset zoom offset.
                this.zoomOffset = 5;

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
                // otherwise default to the height of the body and the witdth (with some padding)
                // of the containing element.
                this.height = config.height || $(document.body).height();
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

                    var numOverlays = this.overlays.length;
                    // add an appropriate zoom offset, if needed.
                    if (numOverlays < this.MIN_OVERLAYS) {
                        // apply maximum zoom offset if we have less than the minimum
                        // overlays needed.
                        this.obj.setZoom(this.obj.getZoom() - this.MAX_ZOOM_OFFSET);
                    } else if (numOverlays === this.MIN_OVERLAYS) {
                        // apply minimum zoom offset if we have exactly the minimum 
                        // amount of overlays.
                        this.obj.setZoom(this.obj.getZoom() - this.MIN_ZOOM_OFFSET);
                    } else {
                        // we have enough overlays. We don't need to add any zoom at all.
                        Fuse.log("Map zoom level:", this.obj.getZoom(), "is enough. Not applying any zoom padding.");
                    }

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
                    if (!overlay.animation || "DROP" === overlay.animation.toUpperCase()) {
                        animation = Maps.Animation.DROP;
                    } else {
                        animation = Maps.Animation.BOUNCE;
                    }
                    var position = new Maps.LatLng(overlay.position.latitude, overlay.position.longitude);

                    var marker = {
                        position: position,
                        title: overlay.title,
                        animation: animation
                    };

                    // if we were given an icon, use it.
                    if (overlay.icon) {
                        marker["icon"] = overlay.icon;
                    }

                    googOverlay = new Maps.Marker(marker);
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

        initActionButtons: function() {
            var showPageFromButton = $.proxy(function(e) {
                var $target = $(e.target);
                var action = $target.closest("a").data("action");
                // show the page either for all vehicles or, 
                // if we are currently looking at a specific vehicle,
                // show the action for just that vehicle.
                var id = Backbone.history.fragment.match(/\/(.*)/);
                var isFleetAction = (action === "fleet");
                // if we have an id, show the page passing the id,
                // otherwise just show the page.
                // note : we check to make sure we're not trying to go to the 
                // fleet page because no matter where we're coming from, it
                // doesn't make sense to pass any id's to the fleet page.
                (!isFleetAction && !!id && !!id[1]) ? this.show(action, {id: id[1]}) : this.show(action);
                e.handled = true;
            }, this);
            $(document).on("tap", ".fuse-footer-container > a > img, .fuse-header-container > a > img", showPageFromButton);
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
            $(document).on("mouseenter", "img[title]", function() {
                $(this).tooltipster({
                    theme: "tooltipster-shadow"
                });
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

        // quick and dirty way to add template helper functions
        // in such a way that underscore templates can see and use 
        // them.
        addTemplateHelpers: function(helperFuncs) {
            // FTH = Fuse Template Helpers.
            window["FTH"] = window["FTH"] || {};

            for (helperFunc in helperFuncs) {
                window["FTH"][helperFunc] = helperFuncs[helperFunc];
            }
        },

        init: function() {
            // setup the action buttons in the header and footer.
            this.initActionButtons();
            // add reusable map container to page.
            this.initMap();
            // inialize tooltip plugin.
            this.initTooltips();
            // prevent ghost taps.
            this.preventGhostTaps();
            // add custom underscore template helpers.
            this.addTemplateHelpers({
                // got the regex idea from stackoverflow.
                // the regex uses 2 lookahead assertions: 
                // - a positive one to look for any point in 
                //   the string that has a multiple of 3 digits 
                //   in a row after it 
                // - a negative assertion to make sure that point 
                //   only has exactly a multiple of 3 digits. 
                // The replacement expression puts a comma there.
                commaSeperateNumber: function(num) {
                    var parts = num.toString().split(".");
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return parts.join(".");
                }
            });
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

        logging: false
    };

    // since backbone has already written a great extend function, lets just reuse it in our controller.
    Fuse.Controller.extend = Backbone.Model.extend;

    return Fuse;
});
