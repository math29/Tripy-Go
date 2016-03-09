import {Component, OnInit} from 'angular2/core';
import {Item, SidebarElementCmp} from './sidebar_element';
import {UserSingleton} from '../../singletons/user.singleton';
import {Location, RouteConfig, RouterLink, Router,Route,  ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'sidebar',
  templateUrl: 'views/components/sidebar/sidebar.html',
  directives: [ROUTER_DIRECTIVES, SidebarElementCmp],
  pipes: []
})
export class SidebarCmp{
  public user: any;
  public userS: any;
  public items: Item[] = [];
  userSingleton: UserSingleton;

  constructor(private router: Router){
    this.userSingleton = UserSingleton.getInstance();
  }

  ngOnInit(){
    this.user = this.userSingleton.getUser();
    this.userSingleton.userObservable$.subscribe(updateUser => {this.user = updateUser; this.updateItems()});
    this.updateItems();

  }

  updateItems(){
      let dashboard: Item = {"route":"Home", "icon":"fa-dashboard", "content":"Dashboard"};
      let mongo: Item = {"route":"Mongo", "icon":"fa-database", "content":"Mongo stats"};
      let countries: Item = {"route":"Countries", "icon":"fa-table","content":"Pays"};
      let langues:Item = {"route":"Langues","icon":"fa-table","content":"Langues"};
      let logs:Item = {"route":"Logs", "icon":"fa-filter", "content":"Logs"};
      let timelines: Item = {"route":"Timelines", "icon":"fa-table", "content":"Timelines"};

      this.items = [];
      this.items.push(dashboard);

      this.items.push(countries);
      this.items.push(langues);
      this.items.push(timelines);
      if(UserSingleton.getInstance().isAdminInfo()){
        this.items.push(mongo);
        this.items.push(logs);
      }
  }

}
