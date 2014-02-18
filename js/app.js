// setup require js.
require.config({
    baseUrl: "/js",
    paths: {
        "jquery": "vendor/jquery-1.11.0.min",
        "jquerymobile": "vendor/jquery.mobile-1.4.0.min",
        "cloudosvanilla": "vendor/CloudOS",
        "cloudos": "vendor/CloudOS-config",
        "underscore": "vendor/underscore-min",
        "text": "vendor/requre.text",
        "backbone": "vendor/backbone-min"
    },

    shim: {
        "underscore": {
            exports: "_"
        },
        "cloudosvanilla": {
            deps: ["jquery"]
        },
        "cloudos": {
            deps: ["cloudosvanilla"],
            exports: "CloudOS"
        },
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        }
    }
});

require(["main"]);
