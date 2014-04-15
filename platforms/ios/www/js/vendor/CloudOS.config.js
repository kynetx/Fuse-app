require(["jquery"], function($) {
    $(document).on("mobileinit", function(e){
        CloudOS.host = "kibdev.kobj.net";
        CloudOS.appKey = "0038FCF6-98E2-11E3-A16E-E66C87B7806A";
        CloudOS.callbackURL = window.location.href.split('#')[0];
    });
});
