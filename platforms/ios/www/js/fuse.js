define(["backbone", "jquery", "underscore", "vendor/google.maps", "text!templates/headertmpl.html", "text!templates/contenttmpl.html", "text!templates/footertmpl.html", "text!templates/menutmpl.html", "text!templates/maptmpl.html"], function(Backbone, $, _, Maps, headerTmpl, contentTmpl, footerTmpl, menuTmpl, mapTmpl) {
    var Fuse = {
        
        VERSION: "0.0.6.4",

        history: {
            items: [],

            get: function(i) {
                var offset = i - 1;
                var idx = this.items.length + offset;
                return this.items[idx];
            },

            last: function() {
                return this.get(0);
            }
        },


        callbacks: {
            directionsSuccess: function(directions) {
                /**
                 * Bind the directions renderer to the map if it has no map.
                 * The directoins renderer is unbound from the map 
                 * when Fuse.map.reset() is called.
                 */
                if ( !this.directionsRenderer.getMap() ) {
                    this.directionsRenderer.setMap(this.obj);
                }
                var $panel = $("#directions-panel");
                if (!$panel.length) {
                    var panel = document.createElement("div");
                    panel.id = "directions-panel";
                    document.body.appendChild(panel);
                }
                this.directionsRenderer.setPanel(document.getElementById("directions-panel"));
                if (!$panel.is(":visible")) {
                    $panel.show();
                }
                this.directionsRenderer.setDirections(directions);
                Fuse.loading("hide");
            },

            directionsError: function(error) {
                Fuse.loading( "hide" );
                switch ( error ) {
                    case Maps.DirectionsStatus.NOT_FOUND:
                        Fuse.log( "ERROR! One of the locations in the directions request could not be found." );
                        break;
                    case Maps.DirectionsStatus.ZERO_RESULTS:
                        Fuse.log( "ERROR! No route was found between the given origin and destination points." );
                        break;
                    case Maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED:
                        Fuse.log( "ERROR! Too many additional waypoints used in directions request." );
                        break;
                    case Maps.DirectionsStatus.INVALID_REQUEST:
                        Fuse.log( "ERROR! Directions request was invalid. This usually occurs because the origin and/or destination points are missing." );
                        break;
                    case Maps.DirectionsStatus.OVER_QUERY_LIMIT:
                        Fuse.log( "ERROR! Too many directins requests have been issued within the alotted time. Try again later." );
                        break;
                    case Maps.DirectionsStatus.REQUEST_DENIED:
                        Fuse.log( "ERROR! No permission to use directions service." );
                        break;
                    case Maps.DirectionsStatus.UNKNOWN_ERROR:
                        Fuse.log( "ERROR! The directions service request encountered an unknown error. Try again later." );
                        break;
                    default:
                        throw new Error( "Fatal Google Maps Directions Error!" );
                        break;
                }
            },

            tripRouteSuccess: function( directions ) {
                if( !this.directionsRenderer.getMap() ) {
                    this.directionsRenderer.setMap( this.obj );
                }

                this.directionsRenderer.setDirections( directions );
                Fuse.loading( "hide" );
            },

            placesSuccess: function( places, cb ) {
                if ( typeof cb === "function" ) {
                    cb( places );
                }
            },

            placesError: function( error ) {
                Fuse.loading( "hide" );

                switch ( error ) {
                    case Maps.places.PlacesServiceStatus.ERROR:
                        Fuse.log( "ERROR! There was a general error contacting the Google Places Service API." );
                        break;
                    case Maps.olaces.PlacesServiceStatus.INVALID_REQUEST:
                        Fuse.log( "ERROR! Google Places Service request was invalid." );
                        break;
                    case Maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT:
                        Fuse.log( "ERROR! Too many Google Places Service requests have been issues within the alloted time. Try again later." );
                        break;
                    case Maps.places.PlacesServiceStatus.NOT_FOUND:
                        Fuse.log( "ERROR! The location used in the Google Places Service request could not be found." );
                        break;
                    case Maps.places.PlacesServiceStatus.REQUEST_DENIED:
                        Fuse.log( "ERROR! Fuse has been blocked from using the Google Places Service API." );
                        break;
                    case Maps.places.PlacesServiceStatus.ZERO_RESULTS:
                        Fuse.log( "ERROR! No matching places returned from Google Places Service." );
                        break;
                    case Maps.places.PlacesServiceStatus.UNKNOWN_ERROR:
                        Fuse.log( "ERROR! A Google Places Service API Server Error occured. The request may succeed if it is attempted again." );
                        break;
                    default:
                        throw new Error( "Fatal Google Places Service Error!" );
                        break;
                }
            }
        },

        invoke: function( cb, context ) {
            this.callbacks[ cb ].apply( context, Array.prototype.slice.call( arguments, 2 ) );
        },

        RouteToView: {
            "fleet"                 : "Fleet",
            "findcar"               : "FindCar",
            "fuel"                  : "Fuel",
            "trips"                 : "Trips",
            "trip"                  : "Trip",
            "maintenance"           : "MaintenanceSplash",
            "maintenance-alerts"    : "MaintenanceAlerts",
            "maintenance-reminders" : "MaintenanceReminders",
            "maintenance-history"   : "MaintenanceHistory"
        },

        shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

        Router: Backbone.Router.extend({
            initialize: function() {
                this.on( "route", this.addRouteToHistory, this );
            },

            addRouteToHistory: function(name, args) {
                var previous = Fuse.history.last();

                if ( !previous || previous.fragment !== Backbone.history.fragment ) {
                    var splitFrag = Backbone.history.fragment.split("/");
                    Fuse.history.items.push({
                        name        : splitFrag[0],
                        args        : args,
                        fragment    : Backbone.history.fragment
                    });
                }
            },

            invokeControllerFunction: function() {
                var args = Array.prototype.slice.call(arguments);

                // if the first argument is a function name.
                if ( typeof args !== "undefined" && typeof args[ 0 ] === "string" ) {
                    var func = this.controller[ args[ 0 ] ];
                    // if its not a valid function.
                    if ( !func ) {
                        Fuse.log( "No such controller function:", func );
                        Fuse.log( "Aborting route execution from router:", this );
                    } else {
                        // invoke the function, passing it any leftover arguments
                        // we have.
                        func.apply( this.controller, args[ 1 ] );
                    }
                }
            }
        }),

        Collection: Backbone.Collection.extend({
            filterById: function(id) {
                var filtered = this.filter(function( item ) {
                    return id === item.get( "id" );
                });
                
                return ( filtered.length > 0 ) ?  new this.constructor( filtered ) : this;
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

            initialize: function(options) {
                if (options.controller) {
                    this.controller = options.controller;
                }

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
            },

            headerTemplate: _.template(headerTmpl),
            footerTemplate: _.template(footerTmpl),
            contentTemplate: _.template(contentTmpl),

            renderHeader: function() {
                Fuse.log("Rendering header.");

                var options = {
                    header: this.header,
                    icon: "menu"
                },
                    previousView = Fuse.history.last(),
                    currentRoute = Backbone.history.fragment.split( "/" )[ 0 ];
                
                Fuse.log("is main feature view:", this.isMainFeatureView() );

                if ( !this.isMainFeatureView() && previousView && currentRoute.indexOf( previousView.name.substring( 0, 4 ) ) > -1 ) {
                    options[ "icon" ] = "back";
                }

                this.$el.append( this.headerTemplate( options ) );
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

                this.cleanup();
                this.delegateEvents();
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
                    dups.empty();
                    dups.remove();
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
                var changePageOptions = {
                    transition: this.transition,
                    role: this.role,
                    changeHash: false
                };

                var previous = Fuse.history.get(-1), current = Fuse.history.last(), next = Backbone.history.fragment.split("/")[0];
                if ( previous && Backbone.history.fragment === previous.fragment && "findcar" !== next ) {
                    var viewName = Fuse.RouteToView[current.name], view;

                    if ( previous.args.length ) {
                        switch( viewName ) {
                            case "Fleet":
                                view = "Vehicle";
                                break;
                            default:
                                view = viewName;
                                break;
                        }
                    } else {
                        switch( viewName ) {
                            case "Trips":
                                view = "TripAggregate";
                                break;
                            default:
                                view = viewName;
                                break;
                        }
                    }

                    changePageOptions["transition"] = this.controller.views[ view ].transition;
                    changePageOptions["reverse"] = true;
                }

                Fuse.log( "Changing page to:", this.el, "with options:", changePageOptions );
                $.mobile.changePage( this.$el, changePageOptions );
            },

            isMainFeatureView: function() {
                return Backbone.history.fragment.split( "/" ).length > 1;
            }
        }),

        mapTemplate: _.template(mapTmpl),
        menuTemplate: _.template(menuTmpl),

        map: {

            directionsService: new Maps.DirectionsService(),
            directionsRenderer: new Maps.DirectionsRenderer(),

            // overlay types
            OverlayTypeId: {
                MARKER: 0,
                TRIP: 1
            },

            MAX_ADDITONAL_WAYPOINTS: 8,

            overlays: [],
            listeners: [],
            infoWindow: new Maps.InfoWindow(),
            /**
             * this is used to offset the default google maps zoom level
             * in case we don't have enough markers/overlays for the default
             * zoom level to make sense. 3 seems to be a reasonable ceiling for
             * the number of overlays needed for the default google maps zoom 
             * to look good. So when there are less than 3 markers/overlays
             * on the map, we make use of the zoom offfset, otherwise it's ignored.
             */
            MAX_ZOOM_OFFSET: 4,
            MIN_ZOOM_OFFSET: 2,

            MIN_OVERLAYS: 3,

            invokeDirectionsSuccess: function( directions ) {
                Fuse.invoke( "directionsSuccess", this, directions )
            },

            invokeDirectionsError: function( error ) {
                Fuse.invoke( "directionsError", this, error );
            },

            invokeTripRouteSuccess: function( directions ) {
                Fuse.invoke( "tripRouteSuccess", this, directions );
            },

            invokePlacesSuccess: function( places, cb ) {
                Fuse.invoke( "placesSuccess", this, places, cb );
            },

            invokePlacesError: function( error ) {
                Fuse.invoke( "placesError", this, error );
            },

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
                // remove all overlays and remove their respective listeners.
                while (this.overlays.length) {
                    var overlay = this.overlays.pop();
                    Fuse.log("Removing overlay:", overlay, "from map:", this);
                    Maps.event.clearInstanceListeners(overlay);
                    overlay.setMap(null);
                }

                this.bounds = null;

                // reset zoom offset.
                this.zoomOffset = 5;

                // reset directions renderer.
                this.directionsRenderer.setPanel(null);
                this.directionsRenderer.setMap(null);

                this.willAutoFit = false;
                this.lats = [];
                this.lngs = [];
                this.sanatizedWaypoints = [];
                this.salientWaypoints = [];

                var $panel = $("#directions-panel");
                if ($panel.length && $panel.is(":visible")) {
                    $panel.hide();
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
                if ( !config ) {
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
                this.width = ( config.width || this.$container.width() ) + 25;
                // adjust the map to the new configuration.
                this.adjust();
                // setup bounds.
                this.bounds = new Maps.LatLngBounds();
                // add overlays, if any.
                if ( config.overlays ) {
                    while ( config.overlays.length ) {
                        this.addOverlay( config.overlays.pop() );
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

                /**
                 * give the map sufficient time to be setup before asking it to be fitted
                 * to our bounds and zoom level. Tried binding to events triggered by the map
                 * but they were unreliable for determining when the map was ready. So, just to be 
                 * safe we simply give it 140 milliseconds to initialize itself, which appears
                 * to be about the amount of time it takes for the map to finish setting itself
                 * up.
                 */

                // Dont manually handle map fitting if its going to be handled automatically by the Google Maps API.
                if ( !this.willAutoFit ) {
                    setTimeout( fitter, 140 );
                }
            },

            addOverlay: function( overlay ) {
                var googOverlay;
                // Determine the type of overlay.
                switch( overlay.type ) {
                    case this.OverlayTypeId.MARKER:
                        var animation;
                        if ( !overlay.animation || "DROP" === overlay.animation.toUpperCase() ) {
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
                            marker[ "icon" ] = overlay.icon;
                        }

                        googOverlay = new Maps.Marker( marker );

                        if ( typeof overlay.route !== "undefined" ) {
                            this.addRouteToOverlay(overlay.route, googOverlay);
                        }
                        Fuse.log( "Adding overlay:", googOverlay, "to map:", this );
                        // add the overlay to the map.
                        googOverlay.setMap( this.obj );
                        // extend the bounds object to include this marker position.
                        this.bounds.extend( position );
                        // keep track of this overlay so we can remove it later.
                        this.overlays.push( googOverlay );
                        break;
                    case this.OverlayTypeId.TRIP:
                        this.renderTripRoute( overlay );
                        this.willAutoFit = true;
                        break;
                    default:
                        break;
                }
            },

            addRouteToOverlay: function(route, googOverlay) {
                var trigger;
                switch (typeof route) {
                    case "string":
                        trigger = route;
                        break;
                    case "object":
                        trigger = route.on;
                        var origin = route.from;
                        break;
                    default:
                        Fuse.log("Invalid route option:", route);
                        break;
                }
                this.bindRouteEvent(trigger, googOverlay, origin);
            },

            bindRouteEvent: function(trigger, googOverlay, from) {
                // make sure we have valid information from which to work.
                if (!trigger) {
                    Fuse.log("No valid event to route on. Aborting.");
                    return;
                } else if (!googOverlay) {
                    Fuse.log("No valid google overlay. Aborting.")
                    return;
                }

                var self = this;

                Maps.event.addListener(googOverlay, trigger, function(e) {
                    Fuse.loading("show", "getting route...");
                    self.routeToOverlay.call(this, e, self, from);
                });
            },

            routeToOverlay: function(e, map, from) {
                // dsr = directions service request.
                var dsr = {
                    destination: this.position, // 'this' is the overlay that was clicked on.
                    travelMode: Maps.TravelMode.WALKING
                };

                if (typeof from !== "undefined") {
                    dsr["origin"] = new Maps.LatLng(from.latitude, from.longitude);
                    map.makeDirectionsRequest(dsr, map.invokeDirectionsSuccess, map.invokeDirectionsError);
                } else {
                    // otherwise grab the user's current location and use it as the origin
                    // in the drections service request.
                    Fuse.getCurrentPosition(function(pos) {
                        dsr["origin"] = new Maps.LatLng(pos.latitude, pos.longitude);
                        map.makeDirectionsRequest(dsr, map.invokeDirectionsSuccess, map.invokeDirectionsError);
                    });
                }
            },

            // dsr = directions service request, scb = success callback, ecb = error callback.
            makeDirectionsRequest: function(dsr, scb, ecb) {
                var self = this;
                self.directionsService.route(dsr, function(directions, status) {
                    // make sure the callbacks are invoked with the context that
                    // we had coming in.
                    if (Maps.DirectionsStatus.OK === status) {
                        scb.call(self, directions);
                    } else {
                        ecb.call(self, status);
                    }
                });
            },

            /**
             * Make a call to the google places api to get nearby places
             * given a classification.
             * @param classification -  the type of places to be searched. IE resteraunt, hostpital, etc.
             * @param cb             -  callback to handle returned places data.
             */
            getNearbyPlaces: function( classification, cb ) {
                var self = this;
                Fuse.getCurrentPosition(function( location ) {
                    var pos = new Maps.LatLng( location.latitude, location.longitude ),
                        psr = {
                            location:   pos,
                            types:      [ classification ],
                            rankBy:     Maps.places.RankBy.DISTANCE
                        };
                    self.placesService.nearbySearch( psr, function( places, status ) {
                        if ( Maps.places.PlacesServiceStatus.OK === status ) {
                            self.invokePlacesSuccess( places, cb );
                        } else {
                            self.invokePlacesError( status );
                        }
                    });
                });
            },

            // Renders a trip route on the map.
            renderTripRoute: function( trip ) {
                this.lats = [];
                this.lngs = [];
                this.sanatizedWaypoints = [];
                this.salientWaypoints = [];
                var origin = new Maps.LatLng( trip.origin.latitude, trip.origin.longitude ),
                    destination = new Maps.LatLng( trip.destination.latitude, trip.destination.longitude );

                _.each([ origin, destination ], function( el, idx ) {
                    this.lats.push( el.lat() );
                    this.lngs.push( el.lng() );
                }, this );

                var routeRequest = {
                    origin: origin,
                    destination: destination,
                    travelMode: Maps.TravelMode.DRIVING
                };

                /**
                 * What follows is a waypoint salience algorithm
                 * that aims to include the most meaningful additional
                 * waypoints present in the trip data, if any at all.
                 */

                 // Check if we have any additional waypoints at all.
                 if ( trip.waypoints ) {
                    Fuse.log( trip.waypoints.length, "additional waypoints available for trip:", trip.id );

                    switch( Object.prototype.toString.call( trip.waypoints ) ) {
                        case "[object Array]":
                            _.each( trip.waypoints, function(waypoint, idx) {
                                this.sanatizeWaypoint( waypoint.value );
                            }, this );
                            break;
                        case "[object Object]":
                            this.sanatizeWaypoint( trip.waypoints.value );
                            break;
                        default:
                            Fuse.log( "Trip waypoints data is neither an object or an array. It is:", Object.prototype.toString.call( trip.waypoints ) );
                            break;
                    }

                    /**
                     * 'sanatizedWaypoints' now contains only unique supplementary waypoints.
                     * Now we run 'sanatizedWaypoints' through a salience algorithm because
                     * the google maps javascript API only allows us to send a limited number
                     * of additional waypoints (8 to be exact) in a directions service request. 
                     * Waypoints that meet the salience requirements will be pushed onto 'salientWaypoints.'
                     * 'salientWaypoints' is then the collection of waypoints we send with
                     * our directions service request.
                     */
                    if ( this.sanatizedWaypoints.length > 0 ) {
                        if ( this.sanatizedWaypoints.length > this.MAX_ADDITONAL_WAYPOINTS ) {
                            var interestInterval = Math.floor( this.sanatizedWaypoints.length / 4 );
                            Fuse.log( "1/4 of all unique waypoints is approximatley", interestInterval, "elements." );
                            var needle = 0;
                            while ( needle < this.sanatizedWaypoints.length ) {
                                if ( needle % interestInterval === 0 ) {
                                    Fuse.log( "Adding waypoint at index", needle, "to final waypoints." );
                                    this.salientWaypoints.push( this.sanatizedWaypoints[ needle ] );
                                }
                                ++needle;
                            }

                            // If no waypoints passed our salience filter, just use the sanatized waypoints as the salient waypoints.
                            this.salientWaypoints = ( this.salientWaypoints.length ) ? this.salientWaypoints : this.sanatizedWaypoints;

                            // Reverse our salient waypoints so they are in the correct chronological order again.
                            if ( this.salientWaypoints.length > 1 ) {
                                this.salientWaypoints.reverse();
                            }

                            var pluralOrNot = ( this.salientWaypoints.length === 1 ) ? "waypoint" : "waypoints";
                            routeRequest[ "waypoints" ] = this.salientWaypoints;

                            Fuse.log( this.salientWaypoints.length, "additional unique", pluralOrNot, "added to trip route", trip.id );
                        }
                    } else {
                        Fuse.log( "Additional waypoints were present in the data for trip", trip.id, "but none were unique, so none will be added to the request." );
                    }

                    // Make the request.
                    Fuse.loading( "show", "getting trip route..." );
                    this.makeDirectionsRequest( routeRequest, this.invokeTripRouteSuccess, this.invokeDirectionsError );
                }
            },

            sanatizeWaypoint: function( waypoint ) {
                var latLngSplit = waypoint.split( "," ),
                    lat = latLngSplit[ 0 ],
                    lng = latLngSplit[ 1 ];

                // Check to make sure we're not adding a duplicate waypoint.
                if ( this.lats.indexOf( lat ) === -1 && this.lngs.indexOf( lng ) === -1 ) {
                    this.sanatizedWaypoints.push({
                        location: new Maps.LatLng( lat, lng ),
                        stopover: false
                    });

                    this.lats.push( lat );
                    this.lngs.push( lng );
                }
            }
        },

        initActionButtons: function() {
            var showPageFromButton = $.proxy(function(e) {
                var $target = $(e.target), 
                    action = $target.closest("a").data("action"),
                    fragment = Backbone.history.fragment,
                    id = fragment.match(/\/(.*)/);

                if ( "findcar" === action ) {
                    // if we are already on the findcar page but they
                    // clicked on the findcar button in the footer,
                    // we toggle back to the fleet view.
                    if (/findcar/.test(Backbone.history.fragment)) {
                        action = "fleet";
                    }
                }

                if ( id && id[ 1 ] ) {
                    this.show( action, { id: id[ 1 ] });
                } else {
                    this.show( action );
                }


                e.handled = true;
            }, this);
            $(document).on("tap", ".fuse-footer-container > a > img, .fuse-header-container > a > img", showPageFromButton);
        },

        initMenu: function() {
            var showPageFromMenu = $.proxy(function(e) {
                var $target = $(e.target),
                    action = $target.data("action");
                    vid = $target.data("vid");

                if (vid) {
                    this.show(action, {id: vid});
                } else {
                    this.show(action);
                }

            }, this);
            var menu = this.menuTemplate({items: Fuse.menu, fleet: Fuse.FIXTURES.fleet.index});
            $(document.body).append(menu);
            $("#menu").sidr().on("tap", "li > a", showPageFromMenu);
            $(document).on("swiperight", "[data-role='page']", function(e) {
                // if we're in the map element, do nothing.
                if ($.contains(document.getElementById("fuse-map"), e.target)) {
                    return;
                }
                e.preventDefault();
                $.sidr("open");
            }).on("tap", "#open-menu", function() {
                $.sidr("toggle");
            }).on("tap", "[data-role='page']", function() {
                if ($(document.body).hasClass("sidr-open")) {
                    $.sidr("close");
                }
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

            /**
             * We initialize a PlacesService object here because 
             * it requires the map object itself being initialized.
             */
            this.map.placesService = new Maps.places.PlacesService( this.map.obj );
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
            // setup the menu.
            this.initMenu();
            // add reusable map container to page.
            this.initMap();
            // inialize tooltip plugin.
            this.initTooltips();
            // prevent ghost taps.
            this.preventGhostTaps();
            // add custom underscore template helpers.
            this.addTemplateHelpers({
                /**
                 * Insert commas into numbers where needed.
                 * got the regex idea from stackoverflow.
                 * the regex uses 2 lookahead assertions: 
                 * - a positive one to look for any point in 
                 *   the string that has a multiple of 3 digits 
                 *   in a row after it 
                 * - a negative assertion to make sure that point 
                 *   only has exactly a multiple of 3 digits. 
                 * The replacement expression puts a comma there.
                 */
                commaSeperateNumber: function( num ) {
                    var parts = num.toString().split(".");
                    parts[ 0 ] = parts[ 0 ].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return parts.join(".");
                },

                monthDayYear: function( datestr ) {
                    var newStr = datestr.replace(/\s+/g,'');

                    var month = newStr.substring( 4, 6 ),
                        day = newStr.substring( 6, 8 ),
                        year = newStr.substring( 0, 4 );

                    var buildStr = Fuse.shortMonths[ month-1 ] + ' ' + day + ', ' + year;
                    return buildStr;
                },

                getTime: function( datestr ) {
                    var parts = datestr.split(" ");
                    var time = parts[ 1 ] + ' ' + parts[ 2 ];

                    return time;
                },

                /**
                 * Format a date for human consumption.
                 * Takes an optional paramater that determines whether
                 * it should return a precomposed human readable date or
                 * the raw Date object.
                 */
                formatDate: function( datetime, prettyPrint ) {
                    // Get the date into a managable format.
                    datetime = datetime.replace(/\+/, "")
                                       .replace(/T/g, "")
                                       .replace(/:/, "")
                                       .replace(/\s/g, "");

                    var dateYear = datetime.slice(0,4),
                        dateMonth = datetime.slice(4,6),
                        dateDay = datetime.slice(6,8),
                        dateHour = datetime.slice(8,10),
                        dateMinute = datetime.slice(10,12),
                        dateSecond = datetime.slice(12,14),
                        dateBuild  = dateYear + '-' +
                                     dateMonth + '-' +
                                     dateDay + 'T' +
                                     dateHour + ':' +
                                     dateMinute + ':' +
                                     dateSecond + '.000Z',
                        out = new Date( dateBuild );

                    return ( prettyPrint ) ? out.toLocaleDateString() + " " + out.toLocaleTimeString() : out;
                },

                /**
                 * Take a duration in milliseconds and convert it to a human consumable format.
                 * Also takes a boolean, succint. Causes the function to return 'minutes seconds'
                 * format instead of 'hours minutes seconds.'
                 */
                formatDuration: function( duration, succint ) {
                    var totalSeconds = parseInt( duration / 1000 ),
                        hours = parseInt( totalSeconds / 24 ) % 24,
                        minutes = parseInt( totalSeconds / 60 ) % 60,
                        seconds = parseInt( totalSeconds % 60, 10 ),
                        form = ( succint ) ? "succint" : "plural";
                        iterator = ( succint ) ? [ minutes, seconds ] : [ hours, minutes, seconds ],
                        redableDuration = iterator.map(function( val, i ) {
                            if ( val > 0 ) {
                                return val + ( ( succint ) ? "" : " " )  
                                           + ( ( val > 1 ) ? this.time.get( i, form ) : 
                                                this.time.get( i, form ) );
                            } else {
                                return "";
                            }
                        }, this ).join(" ");

                    return redableDuration;
                },

                /**
                 * A lookup table for units of time
                 * and a helper function to retrieve a specified
                 * unit of time given an index.
                 */
                 time: {

                    units: [
                        {
                            singular: "hour",
                            plural: "hours",
                            succint: "h"
                        },
                        {
                            singular: "minute",
                            plural: "minutes",
                            succint: "m"
                        },
                        {
                            singular: "second",
                            plural: "seconds",
                            succint: "s"
                        }
                    ],

                    get: function( i, form ) {
                        return this.units[ i ][ form ];
                    }
                 }
            });

            // tell Backbone to start listening for hashchanges.
            Backbone.history.start();
        },

        isInitialized: function() {
            // TODO: is this really the best way to determine if jQM is initialized?
            return $("body").hasClass("ui-mobile-viewport");
        },

        /**
         * Navigate to a given hash, ostensibly one that 
         * has an associated view.
         * @param to - string - The hash to be navigated to.
         * @param options - hash - Optional paramaters to put in the hash.
         * Example usage: Fuse.show( "foo" ), hash becomes => "#foo"
         *                Fuse.show( "foo", { id: "XYZ" } ), hash becomes => "#foo/XYZ"
         */
        show: function(to, options) {

            var page = "", settings = _.extend({}, options);

            // build out the final page url.
            // make sure we're not trying to go to the main fleet page,
            // if so, ignore any passed id.
            if (to !== "fleet-main" && settings.id) {
                page = to + "/" + settings.id;
                this.log("Attempting to show page:", to, " with options:", settings);
            } else {
                if (to === "fleet-main") {
                    page = "fleet";
                } else {
                    page = to;
                }
                this.log("Attempting to show page:", to);
            }

            // if we are already on the requested page...
            if (Backbone.history.fragment === page) {
                this.log("Already on requested page! (", page, ") Not doing anything.");
            } else if (!options && this.routes && this.routes.indexOf(page) < 0) {
                // ...or there are no matching routes...
                // don't examine the routes array for matching routes 
                // if we were passed an options object. Routes like foo/1234
                // are valid but won't be found because foo/:id is what will be 
                // in the routes array.
                this.log ("No routes match requested page. Not doing anything.");
            } else {
                this.navigate(page);
            }
        },

        /**
         * Show a given "to" hash in correct context, that being
         * either vehicle or fleet. Calls Fuse.show() internally.
         * So if we are looking at a view for a single vehicle, and 
         * we call showWithContext to navigate to a different view, 
         * that view will be shown for that vehicle instead of the whole
         * fleet. Likewise, if we call showWithContext from a fleet page,
         * the "to" page will be shown for the whole fleet.
         * @param {to} - string - The hash to navigate to.
         */
        showWithContext: function( to ) {
            var idMatch = Backbone.history.fragment.match(/\/(.*)/);

            /**
             * If "idMatch" is an array, that means our pattern matched.
             * If "idMatch" has two elements, that means our id is the second
             * item in the array.
             */
            if ( Object.prototype.toString.call( idMatch ) === "[object Array]" && idMatch.length === 2 ) {
                this.show( to, { id: idMatch[ 1 ] } );
            } else {
                this.show( to );
            }
        },

        navigate: function(to) {
            Backbone.history.navigate(to, true);
        },

        loading: function(cmd, msg) {
            setTimeout(function() {
                $.mobile.loading(cmd, {
                    text: msg,
                    textVisible: true
                });
            }, 1);
        },

        getCurrentPosition: function( cb ) {
            if ( "geolocation" in navigator ) {
                navigator.geolocation.getCurrentPosition(function( pos ) {
                    if ( typeof cb === "function" ) {
                        cb({
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude
                        });
                    }
                });
            }
        },

        logging: false
    };

    // since backbone has already written a great extend function, lets just reuse it in our controller.
    Fuse.Controller.extend = Backbone.Model.extend;
    
    return Fuse;
});
