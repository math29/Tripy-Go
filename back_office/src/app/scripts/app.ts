import {bootstrap} from 'angular2/platform/browser';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import { FORM_PROVIDERS } from 'angular2/common';

import {ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT} from 'angular2/router';

import {Tripy_Back} from './back';
import {AuthService} from './tripy-lib/services/auth.service';
import {SocketService} from './services/socket.service';


bootstrap(Tripy_Back, [
  FORM_PROVIDERS,
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  AuthService,
  SocketService
]);
