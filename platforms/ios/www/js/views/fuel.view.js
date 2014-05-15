define([ "backbone", "fuse", "jquery", "underscore", "text!templates/fueltmpl.html" ], function( Backbone, Fuse, $, _, fuelTmpl ) {
    return Fuse.View.extend({
        id: "fuel",
        tagName: "div",
        role: "page",
        transition: "slide",
        template: _.template( fuelTmpl ),

        events: {
            "tap .trigger-fillup"   : "showFillupForm",
            "submit #record-fillup" : "recordFillup",
            "change #num-gallons"   : "updateCost",
            "change #price-gallon"  : "updateCost"
        },

        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
            this.header = this.model.get( "nickname" );
        },

        render: function() {
            this.content = this.template({ vehicle: this.model.toJSON() });
            Fuse.View.prototype.render.call( this );

            this.chartCanvas = document.getElementById( "fillup-chart" ).getContext( "2d" );

            // Build chart cost data
            this.costs = [];
            this.controller.currentFillups.each(function( fillup ) {
                this.costs.push( fillup.cost );
            }, this );

            this.costs.push( 25 );
            this.costs.push( 67 );
            this.costs.push( 12 );

            this.chartData = {
                labels: [ "1st", "5th", "10th" ],
                datasets: [
                {
                    fillColor           : "rgba(220,220,220,0.5)",
                    strokeColor         : "rgba(220,220,220,1)",
                    pointColor          : "rgba(220,220,220,1)",
                    pointStrokeColor    : "#fff",
                    data                : this.costs
                }
                ]
            };
            this.chart = new Chart( this.chartCanvas ).Line( this.chartData );
        },

        showFillupForm: function() {
            this.$popup = $( "#fuel-popup" );
            if ( this.$popup.length ) {
                this.getGasStations();
            } else {
                Fuse.log( "Popup could not be found." );
            }
        },

        recordFillup: function(e) {
            e.preventDefault();
            // Grab the values we want.
            var numGallons  = $( "#num-gallons" ).val(),
                priceGallon = $( "#price-gallon" ).val(),
                cost        = $( "#cost" ).val(),
                odometer    = $( "#odometer" ).val(),
                gasStation  = $( "#gas-station" ).val();

            this.controller.addFillup( numGallons, priceGallon, cost, odometer, gasStation );
            this.$popup.popup( "close" );
            alert( "Success!" );
        },

        updateCost: function( e ) {
            e.preventDefault();

            var cost = ( $( "#num-gallons" ).val() * $( "#price-gallon" ).val() ).toFixed( 2 );
            $( "#cost" ).val( cost );

            e.handled = true;
        },

        nextMonth: function() {
            if ( Fuse.currentMonth < 11 ) {
                Fuse.currentMonth += 1;
            } else {
                Fuse.currentMonth = 0;
            }
        },

        previousMonth: function() {
            if ( Fuse.currentMonth > 0 ) {
                Fuse.currentMonth -= 1;
            } else {
                Fuse.currentMonth = 11;
            }
        },

        getGasStations: function() {
            // We make sure to bind the execution context of the callback to the view itself.
            Fuse.loading( "show", "Getting nearby gas stations..." );
            Fuse.map.getNearbyPlaces( "gas_station", this.populateGasStations.bind( this ) );
        },

        populateGasStations: function( stations ) {
            var stationSelect = document.getElementById( "gas-station" ),
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

            // If our model has a valid odometer value, pre-populate the odometer input.
            var odometer = this.model.get( "odometer" );
            if ( odometer ) {
                $( "#odometer" ).val( odometer );
            }

            Fuse.loading( "hide" );
            this.$popup.popup( "open" );
        }
    });
});
