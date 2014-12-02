define([ "fuse", "jquery", "underscore" ], function( Fuse, $, _ ) {
    return Fuse.View.extend({
        tagName: "div",
        id: "find-car",
        contentClass: "fuse-map-container",
        header: "Find Car",
        role: "page",
        transition: "slide",

        initialize: function( options ) {
            Fuse.View.prototype.initialize.apply( this, arguments );

            this.map = {
                container: "#find-car > .fuse-content",
                overlays: []
            };

            this.collection.each(function(vehicle, idx) {
                var icon = "style/images/car_map_icon_"+ idx % 3 +".png";
		console.log("Vehicle in collection: ", vehicle);
		var label = "";
		if(this.notEmpty(vehicle.get("label"))) {
		    label = vehicle.get("label");
		} else if (this.notEmpty(vehicle.get("profileName"))) {
		    label = vehicle.get("profileName");
		} if (this.notEmpty(vehicle.get("name"))) {
		    label = vehicle.get("name");
		} 
                this.map.overlays.push({
                    icon: icon,
                    type: Fuse.map.OverlayTypeId.MARKER,
                    position: vehicle.get("lastWaypoint"),
                    title: label,
                    animation: "drop",
                    route: "click"
                });
            }, this);
        },

	notEmpty: function(x) {
	    return typeof x !== "undefined" &&
		x !== null &&
		x !== "none" &&
		x !== "";
	},

        render: function() {
            Fuse.View.prototype.render.apply( this, arguments );
        }
    });
});
