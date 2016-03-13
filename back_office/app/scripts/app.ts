import {bootstrap} from 'angular2/platform/browser';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import { provide } from 'angular2/core';
import { FORM_PROVIDERS } from 'angular2/common';

import {ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';
import { AuthConfig, AuthHttp } from 'angular2-jwt/angular2-jwt';

import {Tripy_Back} from './back';
import {AuthService} from './tripy-lib/services/auth.service';


bootstrap(Tripy_Back, [
  FORM_PROVIDERS,
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  AuthService,
  provide(AuthHttp,{
    useFactory:(http) => {
      return new AuthHttp(new AuthConfig({
        tokenName: 'jwt'
      }), http);
    },

    deps: [Http]
  })
]);
