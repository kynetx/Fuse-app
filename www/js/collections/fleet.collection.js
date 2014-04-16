define(["fuse", "jquery", "underscore", "models/vehicle.model"], function(Fuse, $, _, Vehicle) {
    return Fuse.Collection.extend({
        model: Vehicle,
    });
});
