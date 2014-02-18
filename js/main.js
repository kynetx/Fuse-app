// setup require js.
require.config({
    baseUrl: "/js",
    paths: {
        "jquery": "vendor/jquery-1.11.0.min",
        "jquerymobile": "vendor/jquery.mobile-1.4.0.min",
        "underscore": "vendor/underscore-min",
        "text": "vendor/requre.text",
        "backbone": "vendor/backbone-min"
    },

    shim: {
        "underscore": {
            exports: "_"
        },
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        }
    }
});

require(["backbone", "jquery", "jquerymobile"], function(Backbone, $, jQM) {
    alert("Hello!!!");
});
