define([ "backbone", "fuse", "jquery", "underscore", "text!templates/fueltmpl.html" ], function( Backbone, Fuse, $, _, fuelTmpl ) {
    return Fuse.View.extend({
        id: "fuel",
        tagName: "div",
        role: "page",
        transition: "slide",
        template: _.template( fuelTmpl ),

        events: {
            "tap .trigger-fillup": "showFillupForm",
            "submit #record-fillup": "recordFillup"
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            this.header = this.model.get( "nickname" );
        },

        render: function() {
            this.content = this.template({ vehicle: this.model.toJSON() });
            Fuse.View.prototype.render.call( this );
        },

        showFillupForm: function() {
            var $popup = $( "#fuel-popup" );

            if ( $popup.length ) {
                Fuse.loading( "show", "Getting nearby gas stations." );
                this.getGasStations(function() {
                    $popup.popup( "open" );
                    Fuse.loading( "hide" );
                });
                $popup.popup( "open" );
            } else {
                Fuse.log( "Popup could not be found." );
            }
        },

        recordFillup: function(e) {
            // We dont want to trigger silly submit actions.
            e.preventDefault();
        },

        getGasStations: function( cb ) {
            Fuse.loading( "show", "getting nearby gas stations" );
            Fuse.getNearbyPlaces( "gas_station", this.populateGasStations );
        },

        populateGasStations: function( stations ) {

        }

    });
});
