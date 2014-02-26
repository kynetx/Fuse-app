    define(["fuse", "jquery", "underscore", "views/vehicles.view"], function(Fuse, $, _, VehiclesView) {
    return Fuse.Controller.extend({
        showVehicleList: function() {
            // this is just dummy data for now.
            new VehiclesView(Fuse.data.vehicles);
        },

        showVehicleDetail: function(id) {
            Fuse.log("Vehicles controller recieved transition and will render vehicle detail page for vehicle with id:", id);
        }
    });
});
