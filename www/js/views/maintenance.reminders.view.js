define([ "fuse", "jquery", "underscore", "text!templates/maintenancereminderstmpl.html" ], function( Fuse, $, _, maintenanceRemindersTmpl ) {
    return Fuse.View.extend({
        id: "maintenance-reminders",
        tagName: "div",
        role: "page",
        header: "Fleet Reminders",
        transition: "slide",
        template: _.template( maintenanceRemindersTmpl ),
        
        events: {
            "tap #create-reminder"          : "showCreateReminderForm",
            "change .reminder-trigger-type" : "showRequestedTriggerType",
            "change #flip"                  : "showRequestedReminderType",
            "submit #reminder"              : "scheduleMaintenanceReminder",
            "tap .reminder"                 : "showCompleteReminderForm",
            "submit #complete"              : "completeReminder"
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            if ( this.model ) {
                this.header = (this.model.get('profileName') || this.model.get('label')) + " Reminders";
            }
            this.reminders = [];
        },

        render: function() {
            // Handle re-renders correctly.
            this.reminders.length = 0;
            this.rid = '';
            this.reminder = {};
            this.vehicleId = '';

            // Are we rendering reminders for the whole fleet or just one vehicle?
            if ( this.model ) {
                this.collectVehicleReminders( this.model );
            } else {
                // The whole fleet.
                this.controller.fleet.each( function( vehicle ) {
                    this.collectVehicleReminders( vehicle );
                }, this );
            }

            this.content = this.template({ data: this.reminders });
            Fuse.View.prototype.render.call( this );

            this.$reminderFormPopup = $( "#reminder-form" );
            this.$reminderCompletePopup = $( "#reminder-complete-form" );

            /**
             * Set the initial state of some input elements to hidden.
             * We have to do it here because jQuery Mobile is stupid.
             * Ok, that's a horrible explanation. We have to do it here
             * because jQuery mobile applies its custom styling in such
             * a way that setting display to none on an element in it's
             * initial state is pointless. So we have to hide them after
             * the fact.
             *
             * Note: jQuery Mobile actually wraps input elements with a
             *       custom wrapper div so it can add more custom styling
             *       and properties to them. So we actually end up having
             *       the input element's container.
             */
            this.$triggerDateInputContainer = $( "#reminder-trigger-date" ).parent();
            this.$triggerMileageInputContainer = $( "#reminder-trigger-mileage" ).parent();
            this.$triggerMonthInputContainer = $("#reminder-trigger-month").parent();
            this.$triggerMilesInputContainer = $("#reminder-trigger-miles").parent();
            this.$notRecurring = $("#not-recurring");
            this.$recurring = $("#recurring");

            this.$triggerDateInputContainer.hide();
            this.$triggerMileageInputContainer.hide();
            this.$triggerMonthInputContainer.hide();
            this.$triggerMilesInputContainer.hide();
            this.$recurring.hide();
        },

        collectVehicleReminders: function( vehicle ) {
            var reminders = vehicle.get( "reminders" );

            if ( reminders !== vehicle.defaults.reminders ) {
                this.reminders.push({
                    vehicle: vehicle.get( "nickname" ),
                    reminders: vehicle.get( "reminders" ),
                    id: vehicle.get( "id" )
                });
            } else {
                this.reminders.push({
                    vehicle: vehicle.get( "nickname" )
                });
            }
        },

        showCreateReminderForm: function( e ) {
            this.$reminderFormPopup.popup( "open" );
            this.$triggerDateInputContainer.show();
            this.$triggerMonthInputContainer.show();
            e.handled = true;
        },

        showCompleteReminderForm: function ( e ) {
            var name = $( e.currentTarget ).text();
            $('#reminder-name').text(name);
            var id = $( e.currentTarget ).attr( 'data-rid' ).split(',');
            this.reminder = $( e.currentTarget );
            this.rid = id[0];
            this.vehicleId = id[1];
            // I'm right here and I have this working.
            // I should be able to use Array.unshift() to push to the front of the history.
            this.$reminderCompletePopup.popup( "open" );
            e.handled = true;
        },

        showRequestedTriggerType: function( e ) {
            var $typeSelect = $( e.target ),
                type = $typeSelect.val();

            switch ( type ) {
                case "mileage":
                    this.$triggerDateInputContainer.hide();
                    this.$triggerMileageInputContainer.show();
                    break;
                case "date":
                    this.$triggerMileageInputContainer.hide();
                    this.$triggerDateInputContainer.show();
                    break;
                case "month":
                    this.$triggerMilesInputContainer.hide();
                    this.$triggerMonthInputContainer.show();
                    break;
                case "miles":
                    this.$triggerMonthInputContainer.hide();
                    this.$triggerMilesInputContainer.show();
                    break;
                default:
                    break;
            }

            e.handled = true;
        },

        showRequestedReminderType: function( e ) {
            var $typeFlip = $( e.currentTarget ),
                type = $typeFlip.val();

            switch ( type ) {
                case "no" :
                    this.$notRecurring.show();
                    this.$recurring.hide();
                    break;
                case "yes":
                    this.$notRecurring.hide();
                    this.$recurring.show();
                    break;
                default:
                    break;
            }
        },

        scheduleMaintenanceReminder: function( e ) {
            e.preventDefault();
            e.stopPropagation();
            var date = new Date();
            date.toISOString();

            var data = $( e.target ).serializeObject(),
                reminder = {
                    date: {
                        id: date,
                        timestamp: date,
                        reason: data.reason,
                        trigger: {
                            type: data.type,
                            value: ( data.mileage ) ? data.mileage : data.date
                        }
                    }
                };
            
            Fuse.log( reminder );
            this.$reminderFormPopup.popup( "close" );
            alert( "Success! Reminder saved." );

            e.handled = true;
        },

        completeReminder: function ( e ) {
            e.preventDefault();
            e.stopPropagation();

            if ( this.model ) {
                Fuse.log( this.model.get( 'reminders' )[ this.rid ] );
            } else {
                var reminderObj = this.controller.fleet.get( this.vehicleId ).get( 'reminders' )[ this.rid ];
                var history = this.controller.fleet.get( this.vehicleId ).get( 'history' );
                var reminders = this.controller.fleet.get( this.vehicleId ).get( 'reminders' );
                delete reminders[ this.rid ];

                if ( typeof history[ "never" ] !== "undefined" ) {
                    history = {};
                }
                history[ this.rid ] = reminderObj;

                this.controller.fleet.get( this.vehicleId ).set( 'reminders', reminders, { silent: true } );
                this.controller.fleet.get( this.vehicleId ).set( 'history', history, { silent: true } );

            }
            this.$reminderCompletePopup.popup( "close" );
            alert( "The reminder has been completed and moved to your history." );

            e.handled = true;
        }
    });
});
