define([ "fuse", "jquery", "underscore", "text!templates/settingspreferencestmpl.html" ], function( Fuse, $, _, settingsPreferencesTmpl ) {
    return Fuse.View.extend({
        id: "settings-preferences",
        tagName: "div",
        role: "page",
        header: "Preferences",
        transition: "slide",
        template: _.template( settingsPreferencesTmpl ),

        events: {
	    "change #preference-debug-mode": "updateDebugMode"
        },

        
        initialize: function() {
            Fuse.View.prototype.initialize.apply( this, arguments );
        },

        render: function() {
            this.content = this.template();

	    this.$slider = this.$el.find('#preference-debug-mode');
	    console.log("HEY!!", this.$slider);
	    this.$slider.on("change", function(e, ui){console.log(e, ui)});
            Fuse.View.prototype.render.call( this );
        },

	updateDebugMode: function(val) {
	   var foo = this.$('#preference-debug-mode').val();
	   alert("Debug mode is "+ val + " " + foo);
	}

    });
});
