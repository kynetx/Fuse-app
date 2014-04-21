define([ "fuse", "jquery", "underscore", "text!templates/maintenancealertstmpl.html" ], function( Fuse, $, _, maintenanceAlertsTmpl ) {
    return Fuse.View.extend({
        id: "maintenance-alerts",
        tagName: "div",
        role: "page",
        header: "Fleet Alerts",
        transition: "slide",
        template: _.template( maintenanceAlertsTmpl ),
        
        events: {
            "tap .alert": "showAlertInfo"
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
                this.collectVehicleAlerts( this.model );
            } else {
                // The whole fleet.
                this.controller.fleet.each(function( vehicle ) {
                    this.collectVehicleAlerts( vehicle );
                }, this);
            }
            this.content = this.template({ data: this.alerts });
            Fuse.View.prototype.render.call( this );

            this.$popup = $( "#maintenance-alert-info" );

        },

        collectVehicleAlerts: function( vehicle ) {

            /**
             * This check works because of the way object identity in
             * javascript works. If the alerts object on the current vehicle
             * is equal to the default alerts object, then the vehicle actually
             * has NO alerts and we don't push them onto our alerts array.
             */
            if ( vehicle.get( "alerts" ) !== vehicle.defaults.alerts ) {
                this.alerts.push({
                    vehicle: vehicle.get( "nickname" ),
                    alerts: vehicle.get( "alerts" )
                });
            } else {
                this.alerts.push({
                    vehicle: vehicle.get( "nickname" )
                });
            }
        },

        showAlertInfo: function( e ) {
            var alert = this.alerts[ e.target.dataset.vehicleIdx ];
            Fuse.log( alert );
        }
    });
});
