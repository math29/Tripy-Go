import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Response} from 'angular2/http';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'stack-rate',
  template: `
  <button type="button"
        id="idUp"
        class="btn btn-success glyphicon glyphicon-thumbs-up"
        data-loading-text=" ... ">
    </button>
<button type="button" id="idDown" class="btn btn-warn glyphicon glyphicon-thumbs-down" data-loading-text=" ... ">
    </button>
  `,
  providers: [],
  directives: [ROUTER_DIRECTIVES],
})
export class StackRateCmp{
  private idUp:string;
  private idDown:string;

    constructor(){
    }

    ngOnInit(){
    }

    ngOnDestroy(){
    }
}
