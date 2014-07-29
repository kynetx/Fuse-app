define(["backbone", "fuse", "jquery", "underscore", "views/fleet.item.view", "views/fleet.item.info.view", "text!templates/fleettmpl.html"], function(Backbone, Fuse, $, _, FleetItemView, FleetItemInfoView, fleetTmpl) {
    // the fleet view.
    return Fuse.View.extend({
        tagName: "div",
        id: "fleet",
        role: "page",
        header: "Fleet",
        transition: "slide",
        fleetTemplate: _.template(fleetTmpl),
        events: {
            "tap .fleet-item > a": "showVehicle"
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            this.fleetItems = [];
        },

        render: function() {
            this.fleetItems.length = 0;
            this.collection.each(function( vehicle ) {
                this.renderFleetItem( vehicle );
            }, this );
            
            this.content = this.fleetTemplate({ fleet: this.fleetItems });
            // Redraw the menu with fresh fleet data.
            Fuse.initMenu();
            Fuse.View.prototype.render.call( this );
        },

        renderFleetItem: function( vehicle ) {
            var view = new FleetItemView({
                model: vehicle
            });

            var viewinfo = new FleetItemInfoView({
                model: vehicle
            });

            this.fleetItems.push( view.render().el );
            this.fleetItems.push( viewinfo.render().el );
        },

        showVehicle: function(e) {
            var $target = $(e.target);
            // get the vehicle id fo which we want to render a detail view.
            var vid = $target.closest( "a" ).attr( "data-vid" );
            Fuse.show( "fleet", { id: vid });
            e.handled = true;
        }
    });
});
