import {Component} from 'angular2/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'home',
  templateUrl: 'views/dashboard/home.html',
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class HomeCmp{

}
