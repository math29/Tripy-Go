import {Component, OnInit, OnDestroy} from '@angular/core';
import {Response} from '@angular/http';
import {RouterLink, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

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
