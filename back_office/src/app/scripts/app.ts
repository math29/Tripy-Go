import {bootstrap} from '@angular/platform-browser-dynamic';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import { FORM_PROVIDERS } from '@angular/common';

import {ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT} from '@angular/router-deprecated';

import {Tripy_Back} from './back';
import {AuthService} from './tripy-lib/services/auth.service';
//import {SocketService} from './services/socket.service';
import {SocketService } from './tripy-lib/services/socket.service';


bootstrap(Tripy_Back, [
  FORM_PROVIDERS,
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  AuthService,
  SocketService
]);
