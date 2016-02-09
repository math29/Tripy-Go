import {Component, OnInit} from 'angular2/core';
import {Item, SidebarElementCmp} from './sidebar_element';
import {Location, RouteConfig, RouterLink, Router,Route,  ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'sidebar',
  templateUrl: 'views/components/sidebar/sidebar.html',
  providers: [],
  directives: [ROUTER_DIRECTIVES, SidebarElementCmp],
  pipes: [],
  inputs: ['user']
})
export class SidebarCmp{
  public user: any;
  public items: Item[] = [];

  constructor(private router: Router){console.log( this.router.isRouteActive(router.generate(['Home'])));}

  ngOnInit(){
    let dashboard: Item = {"route":"Home", "icon":"fa-dashboard", "content":"Dashboard"};
    let mongo: Item = {"route":"Mongo", "icon":"fa-database", "content":"Mongo stats"};
    let countries: Item = {"route":"Countries", "icon":"fa-table","content":"Pays"};
    let langues:Item = {"route":"Langues","icon":"fa-table","content":"Langues"};
    let logs:Item = {"route":"Logs", "icon":"fa-filter", "content":"Logs"};
    let timelines: Item = {"route":"Timelines", "icon":"fa-table", "content":"Timelines"};

    this.items.push(dashboard);
    this.items.push(mongo);
    this.items.push(countries);
    this.items.push(langues);
    this.items.push(logs);
    this.items.push(timelines);


  }

}
