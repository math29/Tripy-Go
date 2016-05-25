import {Component, OnInit} from '@angular/core';
import {RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
  selector: 'sidebar-element',
  templateUrl: 'views/components/sidebar/sidebar_element.html',
  styleUrls: ['views/components/sidebar/sidebar_element.css'],
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  pipes: [],
  inputs: ['item']
})
export class SidebarElementCmp{
  public item: Item;
  public class: string = "";

  constructor(private router:Router){}

  /*ngOnInit(){
    if(this.item.active){
      this.class="active";
    }
  }*/
}
export interface Item{
  route: string,
  icon: string,
  content: string
}
