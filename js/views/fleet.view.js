define(["fuse", "jquery", "underscore"], function(Fuse, $, _) {
	return Fuse.View.extend({
		tagName: "div",
		id: "fleet",
		role: "page",
		header: "Fleet",
		transition: "slide",

		initialize: function() {
			Fuse.log("Fleet view initialization.");
			this.mapConfig = {
				container: "#fleet"
			};
		}
	});
});
