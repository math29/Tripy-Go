import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { SiteCmp } from './site.component';


@Component({
    selector: 'travel-page',
    templateUrl: 'app/components/travelPage/components/travel.component.html',
    directives: [ SiteCmp ],
    providers: [],
    styleUrls: ['app/components/travelPage/components/travel.component.css'],
    pipes: []
})

export class TravelPage implements OnInit, OnDestroy {
  @Input() name: any;
  // ajout d'un amis au voyage, utilisé dans l'html
  private addFriend: boolean = false;
  private participants: any;

  private sites: any = [{img: 'assets/images/user.png', name:'Liligo'}];

  constructor() {}

  ngOnInit() {
    this.participants = [];
    this.participants.push({name: 'Yoann Diquélou', picture: '/assets/images/user.png'});
  }


  ngOnDestroy() {
  }

}
