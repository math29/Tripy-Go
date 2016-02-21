import {Component} from 'angular2/core';


@Component({
  selector: 'front-office-a2-app',
  providers: [],
  templateUrl: 'app/front-office-a2.html',
  directives: [],
  pipes: []
})
export class FrontOfficeA2App {
  defaultMeaning: number = 42;
  
  meaningOfLife(meaning) {
    return `The meaning of life is ${meaning || this.defaultMeaning}`;
  }
}
