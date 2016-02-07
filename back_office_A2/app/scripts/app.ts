import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {WTC_Back} from './back';
import {ROUTER_PROVIDERS} from 'angular2/router';



bootstrap(WTC_Back, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);
