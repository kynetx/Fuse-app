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
            "maintenance/:id"           : "showMaintenance",
            "maintenance/alerts"        : "showMaintenanceAlerts",
            "maintenance/:id/alerts"    : "showMaintenanceAlertsForVehicle",
            "maintenance/reminders"     : "showMaintenanceReminders",
            "maintenance/:id/reminders" : "showMaintenanceRemindersForeVehicle",
            "maintenance/history"       : "showMaintenanceHistory",
            "maintenance/:id/history"   : "showMaintenanceHistoryForVehicle"
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

        showMaintenance: function( id ) {
            this.invokeControllerFunction( "showMaintenance", arguments );
        }
    });
});
