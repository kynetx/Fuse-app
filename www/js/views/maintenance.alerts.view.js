define([ "fuse", "jquery", "underscore", "text!templates/maintenancealertstmpl.html" ], function( Fuse, $, _, maintenanceAlertsTmpl ) {
    return Fuse.View.extend({
        id: "maintenance-alerts",
        tagName: "div",
        role: "page",
        header: "Fleet Alerts",
        transition: "slide",
        template: _.template( maintenanceAlertsTmpl ),
        
        events: {
            "tap .alert": "showAlertInfo",
            "tap #schedule-repair": "showPrepopulatedReminderForm",
            "submit #alert-reminder-form": "scheduleAlertMaintenanceReminder"
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            if ( this.model ) {
                this.header = this.model.get( "nickname" ) + " Alerts";
            }
            this.alerts = [];
            this.popups = [];
        },

        render: function() {
            // Handle re-renders correctly.
            this.alerts.length = 0;
            this.popups.length = 0;

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

            this.popups.$alert = $( "#maintenance-alert-info" );
            this.popups.$form = $( "#alert-reminder-form" );
        },

        collectVehicleAlerts: function( vehicle ) {
            var alerts = vehicle.get( "alerts" );
            /**
             * This check works because of the way object identity in
             * javascript works. If the alerts object on the current vehicle
             * is equal to the default alerts object, then the vehicle actually
             * has NO alerts and we don't push them onto our alerts array.
             */
            if ( alerts !== vehicle.defaults.alerts ) {
                this.alerts.push({
                    vehicle: vehicle.get( "nickname" ),
                    alerts: alerts
                });
            } else {
                this.alerts.push({
                    vehicle: vehicle.get( "nickname" )
                });
            }
        },

        showAlertInfo: function( e ) {
            this.tappedAlert = e.target;
            var data = this.tappedAlert.dataset,
                alert = this.alerts[ data.vehicleIdx ].alerts[ data.alertIdx ];
            // Part of the temporary handwaving. To be removed.
            if ( this.tappedAlert.className.indexOf( "ui-icon-check" ) > -1 ) {
                var rem = this.alertReminders[ 0 ],
                    dateObj = rem.filter(function( o ) {
                        return o.name === "date";
                    }).shift();
                this.popups.$alert.find( "#alert-code" ).html( "Maintenance Scheduled" );
                this.popups.$alert.find( "#alert-message > p:eq( 0 )" ).html( "Maintenance already scheduled on" + " " + dateObj.value );
                this.popups.$alert.find( "#schedule-repair" ).hide();
            } else {
                this.popups.$alert.find( "#alert-code" ).html( alert.code );
                this.popups.$alert.find( "#alert-message > p:eq( 0 )" ).html( alert.message );
            }

            this.popups.$alert.popup( "open" );
            e.handled = true;
        },

        showPrepopulatedReminderForm: function( e ) {
            /**
             * Pass error code and message for which we are scheduling
             * a maintenance reminder to the form.
             */
            var alert = {
                code: this.popups.$alert.find( "#alert-code" ).text().replace( /^\s+|\s+$/g, "" ),
                message: this.popups.$alert.find( "#alert-message" ).text().replace( /^\s+|\s+$/g, "" )
            };

            this.popups.$alert.popup( "close" );

            this.popups.$form.find( "#reminder-alert-code" ).val( alert.code );
            this.popups.$form.find( "#reminder-alert-message" ).val( alert.message );
            // This is neccesary because jQuery mobile is weird.
            setTimeout( this.showReminderFormDelayed.bind( this ), 500 );
            e.handled = true;
        },

        showReminderFormDelayed: function() {
            this.popups.$form.popup( "open" );
        },

        scheduleAlertMaintenanceReminder: function( e ) {
            e.preventDefault();
            e.stopPropagation();

            var $form = $( e.target );

            // This is a little temporary handwaving. To be removed.
            if ( !this.alertReminders ) {
                this.alertReminders = [];
            }

            this.alertReminders[ this.alertReminders.length ] = $form.serializeObject();
            Fuse.log( this.alertReminders );

            this.popups.$form.popup( "close" );
            alert( "Success! Maintenance reminder saved." );

            $( this.tappedAlert ).buttonMarkup({ icon: "check" });
            this.tappedAlert = null;
            e.handled = true;
        }
    });
});
