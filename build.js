({    
    baseUrl: "js",
    name: "vendor/require",
    out: "dist/fuse-0.0.2.js",
    include: ["main"],
    optimize: "uglify2",
    wrap: true,
    paths: {
        "jquery": "vendor/jquery-1.11.0.min",
        "tooltipster": "vendor/jquery.tooltipster.min",
        "sidr": "vendor/jquery.sidr",
        "jquerymobile": "vendor/jquery.mobile-1.4.0.min",
        "jquerymobileconfig": "vendor/jquery.mobile.config",
        "cloudos": "vendor/CloudOS",
        "cloudosconfig": "vendor/CloudOS.config",
        "underscore": "vendor/underscore-min",
        "backbone": "vendor/backbone-min",
        // require js plugins.
        // this one lets us load templates from external files.
        "text": "vendor/require.text",
        // this one lets us use require to load things like google maps javascript API.
        "async": "vendor/async"
    },

    shim: {
        "underscore": {
            exports: "_"
        },
        "jquerymobileconfig": ["jquery"],
        "jquerymobile": ["jquery", "jquerymobileconfig"],
        "cloudosconfig": ["jquery"],
        "cloudos": {
            deps: ["jquery", "cloudosconfig"],
            exports: "CloudOS"
        },
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        }
    }
})