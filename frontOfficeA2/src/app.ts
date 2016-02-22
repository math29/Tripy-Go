import {bootstrap} from 'angular2/platform/browser';
import { provide } from 'angular2/core';
import { FORM_PROVIDERS } from 'angular2/common';
import {
	ROUTER_PROVIDERS,
	ROUTER_PRIMARY_COMPONENT,
	LocationStrategy,
	HashLocationStrategy
} from 'angular2/router';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt/angular2-jwt';

import {FrontOfficeA2App} from './app/front-office-a2';

bootstrap(FrontOfficeA2App, [
	FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide(AuthHttp, {
		useFactory: (http) => {
			return new AuthHttp(new AuthConfig({
				tokenName: 'jwt'
			}), http);
		},
		deps: [Http]
    })
]);
