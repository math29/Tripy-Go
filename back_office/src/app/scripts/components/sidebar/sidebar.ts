import {Component, OnInit} from '@angular/core';
import {Item, SidebarElementCmp} from './sidebar_element';
import {UserSingleton} from '../../singletons/user.singleton';
import {AuthService} from '../../tripy-lib/index';
import {RouteConfig, RouterLink, Router,Route,  ROUTER_DIRECTIVES} from '@angular/router-deprecated';

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

  constructor(private router: Router, private _authService:AuthService){
    this.userSingleton = UserSingleton.getInstance();
  }

  ngOnInit(){
    this.user = this.userSingleton.getUser();
    this.userSingleton.userObservable$.subscribe(updateUser => {this.user = updateUser; this.updateItems()});
    this.updateItems();

  }

  isAdmin(){
    return this._authService.isAdmin();
  }

  isAdminInfo(){
    return this._authService.isAdminInfo();
  }

  updateItems(){
      let dashboard: Item = {"route":"Home", "icon":"fa-dashboard", "content":"Dashboard"};
      let users: Item = {"route":"Users", "icon":"fa-users", "content":"Users"};
      let newsletter: Item = {"route":"Newsletter", "icon":"fa-users", "content":"Newsletter"};
      let mongo: Item = {"route":"Mongo", "icon":"fa-database", "content":"Mongo stats"};
      let countries: Item = {"route":"Countries", "icon":"fa-table","content":"Pays"};
      let langues:Item = {"route":"Langues","icon":"fa-table","content":"Langues"};
      let logs:Item = {"route":"Logs", "icon":"fa-filter", "content":"Logs"};
      let timelines: Item = {"route":"Timelines", "icon":"fa-table", "content":"Timelines"};
      let transportTypes: Item = {"route": "TransportTypes", "icon": "fa-car", "content": "Moyens de transports"};
      let transport: Item = {"route": "Transports", "icon": "fa-map", "content": "Transports"};
      let company: Item = {"route": "Company", "icon": "fa-building", "content": "Entreprises"};
      let transportComparator: Item = {"route": "TransportComparator", "icon":"fa-balance-scale", "content": "Comparateur de transport"};
      let transportAgregator: Item = {"route":"Transports", "icon":"fa-filter", "content":"Agregateur"};
      let promos: Item = {"route":"Promos", "icon": "fa-percent", "content": "Promos"};

      this.items = [];
      this.items.push(dashboard);

      this.items.push(countries);
      this.items.push(langues);
      this.items.push(timelines);
      //this.items.push(promos);
      this.items.push(users);
      this.items.push(newsletter);
      this.items.push(transportTypes);
      //this.items.push(transport);
      this.items.push(company);
      this.items.push(transportAgregator);
      this.items.push(transportComparator);
      if(this.isAdminInfo()){
        //this.items.push(mongo);
        this.items.push(logs);
      }
  }

}
