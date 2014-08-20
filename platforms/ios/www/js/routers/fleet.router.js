define([ "fuse", "jquery", "underscore" ], function( Fuse, $, _ ) {
    return Fuse.Router.extend({
        routes: {
            "fleet"                     : "showFleet",
            "fleet/:id"                 : "showVehicle",
            "findcar"                   : "showFindCar",
            "findcar/:id"               : "showFindCar",
            "trips(?*queryString)"      : "showTripAggregate",
            "trips/:id(?*queryString)"  : "showTrips",
            "trip/:id(?*queryString"    : "showTrip",
            "fuel(?*queryString)"       : "showFuelAggregate",
            "fuel/:id(?*queryString)"   : "showFuel",
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

        showTrip: function( id ) {
            this.invokeControllerFunction( "showTrip", arguments );
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
        },

        showMaintenanceHistory: function() {
            this.invokeControllerFunction( "showMaintenanceHistory", arguments );
        },

        showMaintenanceHistoryForVehicle: function( id ) {
            this.invokeControllerFunction( "showMaintenanceHistoryForVehicle", arguments );
        }

    });
});
