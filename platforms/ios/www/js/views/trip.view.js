define([ "backbone", "fuse", "jquery", "underscore", "text!templates/triptmpl.html" ], function( Backbone, Fuse, $, _, tripTmpl ) {
    return Fuse.View.extend({
        tagName: "ul",
        className: "trip",
        
        attributes: function() {
            return {
                "data-tid": this.model.get( "id" ),
                "data-role": "listview"
            };
        },

        events: {
            "tap li > a": "showTripDetail"
        },
        
        template: _.template( tripTmpl ),

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },

        showTripDetail: function( e ) {
            alert( this.model.get( "id" ) );

            e.handled = true;
        }
    });
});