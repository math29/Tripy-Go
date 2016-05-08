import {Component, OnInit} from 'angular2/core';
import {Location, RouteConfig, RouterLink, Router,Route,  ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'stats',
  templateUrl: 'views/components/utils/stats.html',
  providers: [],
  directives: [ROUTER_DIRECTIVES, ],
  pipes: [],
  inputs: ['colour', 'type', 'number', 'comments', 'goto']
})
export class StatsCmp{
  public colour: string;
  public type: string;
  public number: number;
  public comments: string;
  public goto: string;
}
