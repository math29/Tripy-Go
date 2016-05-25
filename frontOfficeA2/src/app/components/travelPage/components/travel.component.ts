import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { SiteCmp } from './site.component';
import { MemberService } from '../services/member.service';


@Component({
    selector: 'travel-page',
    templateUrl: 'app/components/travelPage/components/travel.component.html',
    directives: [ SiteCmp ],
    providers: [ MemberService ],
    styleUrls: ['app/components/travelPage/components/travel.component.css'],
    pipes: []
})

export class TravelPage implements OnInit, OnDestroy {
  @Input() name: any;
  // ajout d'un amis au voyage, utilisé dans l'html
  private addFriends: boolean = false;
  private participants: any;
  private search: any;
  private friendSearch: string;

  private sites: any = [{img: 'assets/images/user.png', name:'Liligo'}];

  constructor(private memberService : MemberService) {}

  ngOnInit() {
    this.participants = [];
    this.participants.push({name: 'Yoann Diquélou', picture: '/assets/images/user.png'});
  }

  searchRequest() {
    if(this.friendSearch.length > 0) {
    this.memberService.searchMember(this.friendSearch)
      .subscribe(success => {
        this.search = success.data;
      }, error => {});
    }else {
      this.search = [];
    }
  }

  ngOnDestroy() {
  }

  addFriend(member: any) {
    alert(JSON.stringify(member));
  }
}
