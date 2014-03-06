define(["backbone", "jquery", "underscore", "models/vehicle.model"], function(Backbone, $, _, Vehicle) {
    return Backbone.Collection.extend({
        model: Vehicle,

        filterById: function(id) {
        	var filtered = this.filter(function(vehicle) {
        		return id === vehicle.get("id");
        	});

        	return new this.constructor(filtered);
        }

    });
});
