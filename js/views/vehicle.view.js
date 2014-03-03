define(["fuse", "jquery", "underscore", "models/vehicle.model", "text!templates/vehicledetailtmpl.html"], function(Fuse, $, _, VehicleModel, vehicleDetailTmpl) {
	return Fuse.View.extend({
		tagName: "div",
		role: "page",
		id: "vehicle-detail",
		transition: "slide",
		template: _.template(vehicleDetailTmpl),

		initialize: function() {
			this.header = this.model.get("nickname");
			this.content = this.template(this.model.toJSON());
			this.render();
		},

		render: function() {
			Fuse.View.prototype.render.apply(this, arguments);
		},
	});
});
