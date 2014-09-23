// setup require js.
require.config({
    baseUrl: "js",
    paths: {
        "jquery": "vendor/jquery-1.11.0.min",
        "jquerymobile": "vendor/jquery.mobile-1.4.0.min",
        "jquerymobileconfig": "vendor/jquery.mobile.config",
        "tooltipster": "vendor/jquery.tooltipster.min",
        "sidr": "vendor/jquery.sidr",
        "cloudos": "vendor/CloudOS",
        "cloudosconfig": "vendor/CloudOS.config",
        "fuseapi": "vendor/fuse.api",
        "underscore": "vendor/underscore-min",
        "backbone": "vendor/backbone-min",
        // require js plugins.
        // this one lets us load templates from external files.
        "text": "vendor/require.text",
        // this one lets us use require to load things like google maps javascript API.
        "async": "vendor/require.async"
    },

    shim: {
        
        "underscore": {
            exports: "_"
        },

        "sidr":  {
            deps: [ "jquery" ]
        },

        "tooltipster": {
            deps: [ "jquery" ]
        },

        "jquerymobileconfig": ["jquery"],
        "jquerymobile": ["jquery", "jquerymobileconfig"],
        "cloudosconfig": ["jquery"],
        "cloudos": {
            deps: ["jquery", "cloudosconfig"],
            exports: "CloudOS"
        },

        "fuseapi": {
            deps: ["cloudos"],
            exports: "API"
        },

        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        }
    }
});

require(["main"]);
