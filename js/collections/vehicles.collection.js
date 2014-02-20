define(["backbone", "jquery", "underscore", "models/vehicle.model"], function(Backbone, $, _, Vehicle) {
    return Backbone.Collection.extend({
        model: Vehicle
    });
});
