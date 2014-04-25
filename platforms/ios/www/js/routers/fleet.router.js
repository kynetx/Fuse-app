define([ "fuse", "jquery", "underscore" ], function( Fuse, $, _ ) {
    return Fuse.Router.extend({
        routes: {
            "fleet"                     : "showFleet",
            "fleet/:id"                 : "showVehicle",
            "findcar"                   : "showFindCar",
            "findcar/:id"               : "showFindCar",
            "trips"                     : "showTripAggregate",
            "trips/:id"                 : "showTrips",
            "fuel"                      : "showFuelAggregate",
            "fuel/:id"                  : "showFuel",
            "maintenance"               : "showMaintenanceSplash",
            "maintenance/:id"           : "showMaintenanceSplashForVehicle",
            "maintenance-alerts"        : "showMaintenanceAlerts",
            "maintenance-alerts/:id"    : "showMaintenanceAlertsForVehicle",
            "maintenance-reminders"     : "showMaintenanceReminders",
            "maintenance-reminders/:id" : "showMaintenanceRemindersForVehicle",
            "maintenance-history"       : "showMaintenanceHistory",
            "maintenance-history/:id"   : "showMaintenanceHistoryForVehicle"
        },

        showFleet: function() {
        	this.invokeControllerFunction( "showFleet", arguments );
        },

        showVehicle: function() {
            this.invokeControllerFunction( "showVehicle", arguments );
        },

        showFindCar: function() {
            this.invokeControllerFunction( "showFindCar", arguments );
        },

        showTripAggregate: function() {
            this.invokeControllerFunction( "showTripAggregate", arguments );
        },
        
        showTrips: function( id ) {
            this.invokeControllerFunction( "showTrips", arguments );
        },

        showFuelAggregate: function( id ) {
            this.invokeControllerFunction( "showFuelAggregate", arguments );
        },

        showFuel: function( id ) {
            this.invokeControllerFunction( "showFuel", arguments );
        },

        showMaintenanceSplash: function() {
            this.invokeControllerFunction ( "showMaintenanceSplash", arguments );
        },

        showMaintenanceSplashForVehicle: function( id ) {
            this.invokeControllerFunction( "showMaintenanceSplashForVehicle", arguments );
        },

        showMaintenanceAlerts: function() {
            this.invokeControllerFunction( "showMaintenanceAlerts", arguments );
        },

        showMaintenanceAlertsForVehicle: function( id ) {
            this.invokeControllerFunction( "showMaintenanceAlertsForVehicle", arguments );
        },

        showMaintenanceReminders: function() {
            this.invokeControllerFunction( "showMaintenanceReminders", arguments );
        },

        showMaintenanceRemindersForVehicle: function( id ) {
            this.invokeControllerFunction( "showMaintenanceRemindersForVehicle", arguments );
        }

    });
});
