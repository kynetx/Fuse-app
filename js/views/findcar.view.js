define(["fuse", "jquery", "underscore"], function(Fuse, $, _) {
	return Fuse.View.extend({
		tagName: "div",
		id: "find-car",
		role: "page",
		header: "Find Car",
		transition: "slide",

		initialize: function() {
			this.map = {
				container: "#fleet"
			};

			this.map.overlays = [];

			this.collection.each(function(vehicle) {
				this.map.overlays.push({
					type: Fuse.map.OverlayTypeId.MARKER,
					position: vehicle.get("lastWaypoint"),
					title: vehicle.get("nickname"),
					animation: "drop"
				});
			}, this);

			Fuse.log(this.map.overlays);
			this.render();
		},

		render: function() {
			Fuse.View.prototype.render.apply(this, arguments);
		}
	});
});
