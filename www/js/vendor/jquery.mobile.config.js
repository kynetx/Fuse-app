require(["jquery"], function($) {
    // configure jQuery mobile to play nice with backbone
    $(document).on("mobileinit", function(e) {
        // no hash-routing
        $.mobile.hashListeningEnabled = false;
        // disable anchor-control
        $.mobile.linkBindingEnabled = false;
        // can cause calling object creation twice and back button issues are solved
        $.mobile.ajaxEnabled = false;
        // stop jquery mobile from trying to start things up
        $.mobile.autoInitializePage = false;
        // we want to handle caching and cleaning the DOM ourselves
        $.mobile.page.prototype.options.domCache = false;

        // consider due to compatibility issues
        // not supported by all browsers
        $.mobile.pushStateEnabled = false;
        // Solves phonegap issues with the back-button
        $.mobile.phonegapNavigationEnabled = true;
        //no native datepicker will conflict with the jQM component
        $.mobile.page.prototype.options.degradeInputs.date = true;
        // set a horizontal distance threshold on swipes.
        $.event.special.swipe.horizontalDistanceThreshold = 100;
    });
});
