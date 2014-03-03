define(["fuse", "jquery", "underscore", "vendor/google.maps", "models/vehicle.model", "text!templates/vehicledetailtmpl.html"], function(Fuse, $, _, Maps, VehicleModel, vehicleDetailTmpl) {
	return Fuse.View.extend({
		tagName: "div",
		role: "page",
		id: "vehicle-detail",
		transition: "slide",
		template: _.template(vehicleDetailTmpl),

		initialize: function() {
			this.header = this.model.get("nickname");
			this.render();
		},

		render: function() {
			this.content = this.template(this.model.toJSON());
			Fuse.log(Maps);
			Fuse.View.prototype.render.apply(this, arguments);
		},
	});
});
