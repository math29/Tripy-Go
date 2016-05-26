import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouteParams } from '@angular/router-deprecated';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

import { SiteCmp } from './site.component';
import { MemberService } from '../services/member.service';
import { SiteService } from '../services/site.service';
import { TravelService } from '../services/travel.service';
import * as _ from 'lodash';


@Component({
    selector: 'travel-page',
    templateUrl: 'app/components/travelPage/components/travel.component.html',
    directives: [ SiteCmp, ANGULAR2_GOOGLE_MAPS_DIRECTIVES ],
    providers: [ MemberService , SiteService , TravelService, ANGULAR2_GOOGLE_MAPS_PROVIDERS],
    styleUrls: ['app/components/travelPage/components/travel.component.css'],
    pipes: []
})

export class TravelPage implements OnInit, OnDestroy {
  @Input() name: any;
  // ajout d'un amis au voyage, utilisé dans l'html
  private addFriends: boolean = false;
  private addSite : boolean = false;

  private participants: any = [];

  private search: any;
  private sitesRetrieved : any;

  private friendSearch: string;
  private siteSearch : string;

  private sites: any;

  private localTravel : any;
  lat: number = 51.223858;
  lng: number = 7.225982;
  private markers: any = [];

  constructor(private memberService : MemberService,
    private siteService: SiteService,
    private travelService : TravelService,
     private params: RouteParams) {
    this.travelService.getThisOne(params.get('travel_id'))
      .subscribe(success => {
        this.participants.push({user: {name: success.author.name, picture: success.author.picture}, status:'author'});
        for(let i = 0; i < success.partners.length; i++) {
          this.participants.push(success.partners[i]);
        }
        this.sites = success.sites;
        this.localTravel = success;
        this.lat = success.transports[0].departure.loc[0];
        this.lng = success.transports[0].departure.loc[1];
        this.createMarkers();
      }, error => { console.log('error')});
  }

  createMarkers() {
      for(let i = 0; i < this.localTravel.transports.length; i++) {
        this.markers.push({lat: this.localTravel.transports[i].departure.loc[0],lng: this.localTravel.transports[i].departure.loc[1], label: this.localTravel.transports[i].departure.name });
        this.markers.push({lat: this.localTravel.transports[i].arrival.loc[0], lng: this.localTravel.transports[i].arrival.loc[1], label: this.localTravel.transports[i].arrival.name});
      }
  }

  ngOnInit() {
  }

  addPartner(partner : any) {
    this.travelService.addPartner( this.params.get('travel_id'), partner._id)
      .subscribe(success => {
        if(success.status == 201) {
          this.participants.push({user: {name: partner.name, picture: partner.picture}, status: 'waiting'});
          this.addFriends = false;
          this.friendSearch = '';
        } else {
          alert('NOK');
        }
      }, error => {
        alert('Error');
      })
  }

  searchRequest() {
    if(this.friendSearch.length > 0) {
    this.memberService.searchMember(this.friendSearch)
      .subscribe(success => {
        let users = success.data;
        this.search = [];
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

  addThisSite(site : any) {
    this.travelService.addUsedSite(this.localTravel._id, site._id, 'transport')
      .subscribe(success => {
        if(success.status == 201) {
          this.sites.push({site_id:site._id, used_type:['transport']});
        }
      },
      error => {
        console.log('unable to add this site');
      }
    )
  }

  ngOnDestroy() {
  }

  addFriend(member: any) {
    alert(JSON.stringify(member));
  }
}
