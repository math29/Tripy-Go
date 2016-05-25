import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouteParams } from '@angular/router-deprecated';
import { SiteCmp } from './site.component';
import { MemberService } from '../services/member.service';
import { SiteService } from '../services/site.service';
import { TravelService } from '../services/travel.service';


@Component({
    selector: 'travel-page',
    templateUrl: 'app/components/travelPage/components/travel.component.html',
    directives: [ SiteCmp ],
    providers: [ MemberService , SiteService , TravelService],
    styleUrls: ['app/components/travelPage/components/travel.component.css'],
    pipes: []
})

export class TravelPage implements OnInit, OnDestroy {
  @Input() name: any;
  // ajout d'un amis au voyage, utilisé dans l'html
  private addFriends: boolean = false;
  private addSite : boolean = false;

  private participants: any;

  private search: any;
  private sitesRetrieved : any;

  private friendSearch: string;
  private siteSearch : string;

  private sites: any = [{img: 'assets/images/user.png', name:'Liligo'}];

  constructor(private memberService : MemberService,
    private siteService: SiteService,
    private travelService : TravelService,
     private params: RouteParams) {
    this.travelService.getThisOne(params.get('travel_id'))
      .subscribe(success => {console.log('success')}, error => { console.log('error')});
  }

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

  searchSiteRequest() {
    if(this.siteSearch.length > 0) {
    this.siteService.search(this.siteSearch)
      .subscribe(success => {
        this.sitesRetrieved = success;
      }, error => {
        console.log('error');
      });
    }else {
      this.sitesRetrieved = [];
    }
  }

  ngOnDestroy() {
  }

  addFriend(member: any) {
    alert(JSON.stringify(member));
  }
}
