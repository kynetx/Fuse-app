define(["fuse", "jquery", "underscore", "models/vehicle.model", "text!templates/vehicledetailtmpl.html"], function(Fuse, $, _, VehicleModel, vehicleDetailTmpl) {
	return Fuse.View.extend({
		tagName: "div"
		role: "page",
		transition: "slide",
		template: _.template(vehicledetailtmpl),

		initialize: function() {

		},

		render: function() {
		},
	});
});
