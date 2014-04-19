define([ "fuse", "jquery", "underscore", "text!templates/maintenancealertstmpl.html" ], function( Fuse, $, _, maintenanceAlertsTmpl ) {
    return Fuse.View.extend({
        id: "maintenance-alerts",
        tagName: "div",
        role: "page",
        header: "Fleet Alerts",
        transition: "slide",
        template: _.template( maintenanceAlertsTmpl ),
        
        events: {
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            if ( this.model ) {
                this.header = this.model.get( "nickname" ) + " Alerts";
            }
            this.alerts = [];
        },

        render: function() {
            // Are we rendering alerts for the whole fleet or just one vehicle?
            if ( this.model ) {
                // Just one vehicle.
                this.alerts.append({
                    vehicle: this.model.get( "nickname" ),
                    alerts: this.model.get( "alerts" )
                });
            } else {
                // The whole fleet.
                this.controller.fleet.each(function( vehicle ) {
                    this.collectVehicleAlerts( vehicle );
                }, this);
            }
            this.content = this.template({ alerts: this.alerts });
            Fuse.View.prototype.render.call( this );
        },

        collectVehicleAlerts: function( vehicle ) {
            this.alerts.append({
                vehicle: vehicle.get( "nickname" ),
                alerts: vehicle.get( "alerts" )
            });
        }

    });
});
