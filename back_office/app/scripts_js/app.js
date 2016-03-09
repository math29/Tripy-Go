System.register(['angular2/platform/browser', 'angular2/http', './back', 'angular2/router'], function(exports_1) {
    var browser_1, http_1, back_1, router_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (back_1_1) {
                back_1 = back_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(back_1.WTC_Back, [http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=app.js.map