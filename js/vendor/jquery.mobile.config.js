require(["jquery"], function($) {
    // configure jQuery mobile to play nice with backbone
    $(document).on("mobileinit", function(e) {
        // no hash-routing
        $.mobile.hashListeningEnabled = false;
        // disable anchor-control
        $.mobile.linkBindingEnabled = false;
        // can cause calling object creation twice and back button issues are solved
        $.mobile.ajaxEnabled = false;
        // jqueyr mobile wont apply proper styling unless its allowed to auto initalize itself...
        // $.mobile.autoInitializePage = false;
        // we want to handle caching and cleaning the DOM ourselves
        $.mobile.page.prototype.options.domCache = false;

        // consider due to compatibility issues
        // not supported by all browsers
        $.mobile.pushStateEnabled = false;
        // Solves phonegap issues with the back-button
        $.mobile.phonegapNavigationEnabled = true;
        //no native datepicker will conflict with the jQM component
        $.mobile.page.prototype.options.degradeInputs.date = true;
    });
});
