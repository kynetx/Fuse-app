define(["fuse", "jquery", "underscore", "models/vehicle.model", "text!templates/vehicledetailtmpl.html"], function(Fuse, $, _, VehicleModel, vehicleDetailTmpl) {
	return Fuse.View.extend({
		tagName: "div",
		role: "page",
		id: "vehicle-detail",
		transition: "slide",
		header: "Vehicle",
		footer: "Fuse",
		template: _.template(vehicleDetailTmpl),

		initialize: function() {
			this.render();
		},

		render: function() {
			this.content = this.template(this.model.toJSON());
			Fuse.View.prototype.render.apply(this, arguments);
		},
	});
});
