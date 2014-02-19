define(["backbone", "jquery", "underscore", "models/vehicle.model.js"], function(Backbone, $, _, Vehicle)) {
    return Backbone.Collection.extend({
        model: Vehicle
    });
});
