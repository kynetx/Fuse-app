define(["fuse", "jquery", "underscore"], function(Fuse, $, _) {
	return Fuse.View.extend({
		tagName: "div",
		id: "find-car",
		contentClass: "fuse-map-container",
		role: "page",
		header: "Find Car",
		transition: "flip",

		initialize: function() {
			Fuse.View.prototype.initialize.apply(this, arguments);
			this.map = {
				container: "#find-car > .fuse-content"
			};

			this.map.overlays = [];

			this.collection.each(function(vehicle, idx) {
				var icon = "../../style/images/car_map_icon_"+ idx % 3 +".png";
				this.map.overlays.push({
					icon: icon,
					type: Fuse.map.OverlayTypeId.MARKER,
					position: vehicle.get("lastWaypoint"),
					title: vehicle.get("nickname"),
					animation: "drop",
					route: "click"
				});
			}, this);
		},

		render: function() {
			Fuse.View.prototype.render.apply(this, arguments);
		}
	});
});
