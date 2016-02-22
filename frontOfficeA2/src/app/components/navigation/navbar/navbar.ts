import {Component} from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
  selector: 'navbar',
  templateUrl: 'app/components/navigation/navbar/navbar.html',
  styleUrls: ['app/components/navigation/navbar/navbar.css'],
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class Navbar {

  constructor() {}

}
