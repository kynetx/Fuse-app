define(["fuse", "jquery", "underscore", "models/vehicle.model", "text!templates/vehicledetailtmpl.html"], function(Fuse, $, _, VehicleModel, vehicleDetailTmpl) {
	return Fuse.View.extend({
		tagName: "div"
		role: "page",
		transition: "slide",
		template: _.template(vehicledetailtmpl),
		events: {
			"click": "logClick"
		},

		initialize: function(vehicle) {
			this.render(vehicle);
		},

		render: function(vehicle) {
			this.content = this.template(vehicle);
			Fuse.View.prototype.render.apply(this, arguments);
		},

		logClick: function(e) {
			Fuse.log("element", e, "was clicked");
		}
	});
});
