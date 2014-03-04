define(["fuse", "jquery", "underscore", "models/vehicle.model", "text!templates/vehicledetailtmpl.html", "text!templates/infowindowtmpl.html"], function(Fuse, $, _, VehicleModel, vehicleDetailTmpl, infoWindowTmpl) {
	return Fuse.View.extend({
		tagName: "div",
		role: "page",
		id: "vehicle-detail",
		transition: "slide",
		template: _.template(vehicleDetailTmpl),
		infoWindowTemplate: _.template(infoWindowTmpl),

		initialize: function() {
			this.header = this.model.get("nickname");
			this.content = this.template(this.model.toJSON());
			this.map = {
				container: "#vehicle-detail-map",
			};
			this.map.overlays = [{
				position: this.model.get("lastWaypoint"),
				title: this.model.get("nickname"),
				animation: "drop",
				infowindow: this.infoWindowTemplate(this.model.toJSON())
			}];
			this.render();
		},

		render: function() {
			Fuse.View.prototype.render.apply(this, arguments);
		},
	});
});
