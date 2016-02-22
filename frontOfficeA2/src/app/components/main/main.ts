import {Component} from 'angular2/core';
import {Navbar} from '../navigation/navbar/navbar';

@Component({
  selector: 'main',
  templateUrl: 'app/components/main/main.html',
  styleUrls: ['app/components/main/main.css'],
  providers: [],
  directives: [Navbar],
  pipes: []
})
export class Main {

	constructor() {}

}
