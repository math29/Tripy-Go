import {Component, OnInit} from '@angular/core';
import {RouteConfig, RouterLink, Router,Route,  ROUTER_DIRECTIVES} from '@angular/router-deprecated';

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
