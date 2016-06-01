import {bootstrap} from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { FORM_PROVIDERS } from '@angular/common';
import { AuthService } from './app/tripy_go_lib/services/auth.service';
import { SocketService} from './app/tripy_go_lib/services/socket.service';

import {
	ROUTER_PROVIDERS,
	ROUTER_PRIMARY_COMPONENT
} from '@angular/router-deprecated';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt/angular2-jwt';
import { NotificationService } from './app/services/notifications.service';
import {FrontOfficeA2App} from './app/front-office-a2';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

bootstrap(FrontOfficeA2App, [
	FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    AuthService,
		SocketService,
		NotificationService, 
    provide(AuthHttp, {
		useFactory: (http) => {
			return new AuthHttp(new AuthConfig({
				tokenName: 'jwt'
			}), http);
		},
		deps: [Http]
    })
]);
