import {Component} from 'angular2/core';
import {HeaderCmp} from './components/header/header';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'wtc-back',
  templateUrl: 'views/dashboard/main.html',
  providers: [],
  directives: [ROUTER_DIRECTIVES, HeaderCmp],
  pipes: []
})
export class WTC_Back{

}
