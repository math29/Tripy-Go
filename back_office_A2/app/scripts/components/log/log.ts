import {Component} from 'angular2/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {PAGINATION_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import {LogService} from '../../services/log.service';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'home',
  templateUrl: 'views/components/log/main.html',
  providers: [],
  directives: [ROUTER_DIRECTIVES, PAGINATION_PROVIDERS],
  pipes: []
})
export class HomeCmp{

}
