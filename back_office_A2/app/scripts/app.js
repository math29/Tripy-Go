var browser_1 = require('angular2/platform/browser');
var http_1 = require('angular2/http');
var back_1 = require('./back');
var router_1 = require('angular2/router');
browser_1.bootstrap(back_1.WTC_Back, [http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS]);
