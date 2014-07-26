require(["jquery"], function($) {
    $(document).on("mobileinit", function(e){
        CloudOS.host = "kibdev.kobj.net";
        CloudOS.appKey = "0038FCF6-98E2-11E3-A16E-E66C87B7806A";
        CloudOS.callbackURL = window.location.href.split('#')[0];
        CloudOS.anonECI = "85255500-0b65-0130-243c-00163ebcdddd";
    });
});
