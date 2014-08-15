define([ "fuse", "jquery", "underscore", "text!templates/tripdetailtmpl.html" ], function( Fuse, $, _, tripDetailTmpl ) {
    return Fuse.View.extend({
        tagName: "div",
        id: "trip-detail",
        header: "Trip Detail",
        role: "page",
        transition: "slide",
        template: _.template( tripDetailTmpl ),

        events: {
            "tap #trip-update-btn"        : "updateTrip"
        },

        initialize: function( options ) {
            Fuse.View.prototype.initialize.apply( this, arguments );

            this.map = {
                container: "#trip-map",
                height: 300,
                overlays: [],
                locked: true
            };

            this.map.overlays.push({
                type            : Fuse.map.OverlayTypeId.TRIP,
                id              : this.model.get( "id" ),
                origin          : this.model.get( "startWaypoint" ),
                destination     : this.model.get( "endWaypoint" )
            });
        },
        
        render: function() {

            if (this.model.get('waypoints')) {
                this.map.overlays[0]['waypoints'] = this.model.get('waypoints');
            }
            
            this.content = this.template({ data: this.model.toJSON() });
            Fuse.View.prototype.render.call( this );

            this.$categorySelect = $( "#category-select" );
            this.$nameInput = $( "#trip-name" );

            if ( this.model.get( "category") !== this.model.defaults.category ) {
                this.$categorySelect.val( this.model.get( "category" ) );
                this.$categorySelect.selectmenu( "refresh" );
            }

            if ( this.model.get( "name" ) !== this.model.defaults.name ) {
                this.$nameInput.val( this.model.get( "name" ) );
            }
        },

        updateTrip: function( e ) {
            e.stopPropagation();
            e.preventDefault();

            var category = this.$categorySelect.val();
            var name = this.$nameInput.val();
            this.model.save({ "name": name, "category": category }, { silent: true });

            e.handled = true;
        }
    });
});
