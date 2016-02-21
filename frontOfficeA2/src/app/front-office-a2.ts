import {Component} from 'angular2/core';
import {
	RouteConfig,
	RouteParams,
	Route,
	ROUTER_DIRECTIVES,
	Router
} from 'angular2/router';


@Component({
  selector: 'front-office-a2-app',
  providers: [],
  templateUrl: 'app/front-office-a2.html',
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class FrontOfficeA2App {
  defaultMeaning: number = 42;

  constructor(public router: Router) {
  }

  meaningOfLife(meaning) {
    return `The meaning of life is ${meaning || this.defaultMeaning}`;
  }
}
