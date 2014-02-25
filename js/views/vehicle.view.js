define(["fuse", "jquery", "underscore", "models/vehicle.model", "text!templates/vehicleDetailTmpl.html"], function(Fuse, $, _, VehicleModel, vehicleDetailTmpl) {
	return Fuse.View.extend({
		tagName: "div"
	});
});
