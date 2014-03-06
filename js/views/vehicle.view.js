define(["fuse", "jquery", "underscore", "models/vehicle.model", "text!templates/vehicletmpl.html", "text!templates/infowindowtmpl.html"], function(Fuse, $, _, VehicleModel, vehicleTmpl, infoWindowTmpl) {
	return Fuse.View.extend({
		tagName: "div",
		role: "page",
		id: "vehicle",
		transition: "slide",
		template: _.template(vehicleTmpl),
		infoWindowTemplate: _.template(infoWindowTmpl),

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
