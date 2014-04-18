define([ "fuse", "jquery", "underscore", "models/aggregate.model", "views/maintenance.aggregate.item.view", "text!templates/maintenanceaggregatetmpl.html" ], function( Fuse, $, _, AggregateModel, MaintenanceAggregateItemView, maintenanceAggregateTmpl ) {
    return Fuse.View.extend({
        id: "maintenance-aggregate",
        tagName: "div",
        role: "page",
        header: "Maintenance",
        transition: "slide",
        template: _.template( maintenanceAggregateTmpl ),

        events: {
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            this.aggregates = [];
        }

    });
});
