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
            this.$popup = $( "#fuel-popup" );
            if ( this.$popup.length ) {
                Fuse.loading( "show", "Getting nearby gas stations." );
                this.getGasStations();
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
            // We make sure to bind the execution context of the callback to the view itself.
            Fuse.map.getNearbyPlaces( "gas_station", this.populateGasStations.bind( this ) );
        },

        populateGasStations: function( stations ) {
            var stationSelect = document.getElementById( "record-fillup" )
                                         .getElementsByTagName( "select" )[ 0 ],
                otherOption = document.createElement( "option" );

            otherOption.setAttribute( "value", "other" );
            otherOption.innerHTML = "Other";

            stations.forEach(function( station ) {
                var info = station.name + " (" + station.vicinity + ")";
                var opt = document.createElement( "option" );
                opt.setAttribute( "value", info );
                opt.innerHTML = info;
                stationSelect.appendChild( opt );
            });

            stationSelect.appendChild( otherOption );

            Fuse.log( "Populated:", stationSelect, "with data:", stations );
            Fuse.loading( "hide" );
            this.$popup.popup( "open" );
        }

    });
});
