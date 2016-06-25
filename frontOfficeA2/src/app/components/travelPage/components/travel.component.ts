import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouteParams, Router } from '@angular/router-deprecated';

import { SiteCmp } from './site.component';
import { MemberService } from '../services/member.service';
import { SiteService } from '../services/site.service';
import { TravelService } from '../services/travel.service';
import { SocketService } from '../../../tripy_go_lib/services/socket.service';

import * as _ from 'lodash';

// import google map
declare var google : any;
declare var $ : any;


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

  private participants: any = [];

  private search: any;
  private sitesRetrieved : any;

  private friendSearch: string;
  private siteSearch : string;
  private travel_name : string;

  private sites: any;

  private map : any;
  private map_width: string = "60%";
  private side_width: string = "40%";

  private localTravel : any;
  lat: number = 51.223858;
  lng: number = 7.225982;
  private markers: any = [];

  constructor(private memberService : MemberService,
    private siteService: SiteService,
    private travelService : TravelService,
    private socketService : SocketService,
    private router : Router,
     private params: RouteParams) {
    this.travelService.getThisOne(params.get('travel_id'))
      .subscribe(success => {
        this.participants.push({user: {name: success.author.name, picture: success.author.picture, _id: success.author._id}, status:'author'});
        for(let i = 0; i < success.partners.length; i++) {
          this.participants.push(success.partners[i]);
        }
        this.sites = success.sites;
        this.localTravel = success;
        this.lat = success.transports[0].departure.loc[0];
        this.lng = success.transports[0].departure.loc[1];
        //this.map.setCenter({lat: this.lat, lng: this.lng});
        this.createMarkers();
        if(! this.localTravel.name) {
          this.lunchUpdateForm();
        }
      }, error => { console.log('error')});
  }

  navigateTo(event : any) : void{
    this.router.navigate(['ResearchTransport', {comparator_id: event, travel_id: this.localTravel._id}]);
  }

  /**
   *
   * Marqueurs des points de départ et d'arrivée des différents transports
   *
   */
  createMarkers() {
    var bounds = new google.maps.LatLngBounds();
    for(let i = 0; i < this.localTravel.transports.length; i++) {

      let marker = new google.maps.Marker({
          position: {lat: this.localTravel.transports[i].departure.loc[0],lng: this.localTravel.transports[i].departure.loc[1]},
          map: this.map,
          title: 'Hello World!'
        });

      bounds.extend(marker.getPosition());
      let marker1 = new google.maps.Marker({
        position: {lat: this.localTravel.transports[i].arrival.loc[0],lng: this.localTravel.transports[i].arrival.loc[1]},
        map: this.map,
        title: 'Hello World!'
      });

      bounds.extend(marker1.getPosition());
      let flightPlanCoordinates = [
        marker.position,marker1.position
      ];

      let flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      flightPath.setMap(this.map);
    }
    this.map.fitBounds(bounds);
  }

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });

    this.socketService.addListener('travel:remove');
    this.socketService.addListener('travel:save');
    this.socketService.socketObservable$.subscribe(socketResponse => {
      switch(socketResponse.channel){
        case 'travel:remove':
          // travel will not be removed for moment
          break;
        case 'travel:save':
          this.onTravelChange(socketResponse.data);
          break;
        default:
      }
    });
  }

  /* comparaison du voyage avant et après,
   * pour ajouter, supprimer ou modifier le voyage en question
   */
  onTravelChange(new_travel : any) {
    let self = this;
    // check that it's the same travel that we are watching
    if(new_travel._id != this.localTravel._id) {
      return;
    }
    // update travel name
    if(new_travel != this.localTravel.name) {
      this.localTravel.name = new_travel.name;
    }

      this.participants = [];
      this.participants.push({user: {name: this.localTravel.author.name, picture: this.localTravel.author.picture, _id: this.localTravel.author._id}, status:'author'});

      this.localTravel.partners = JSON.parse(JSON.stringify(new_travel.partners));
      for(let i = 0; i < this.localTravel.partners.length; i++){
        this.memberService.findById(this.localTravel.partners[i].user)
          .subscribe(success => {
            let index = _.findIndex(this.participants, function(o){return o['user']._id == success._id});
            if(index == -1) {
              this.participants.push({user: {name: success.name, picture: success.picture, _id: this.localTravel.partners[i].user}, status: 'waiting'});
            }
          }, error => {});
      }
    //}
    // si les sites différent
    this.localTravel.sites = new_travel.sites;
    this.sites = [];
    for(let i = 0; i < this.localTravel.sites.length; i++) {
      this.sites.push({site_id:this.localTravel.sites[i].site_id, used_type:['transport']});
    }

  }

  addPartner(partner : any) {
    this.travelService.addPartner( this.params.get('travel_id'), partner._id)
      .subscribe(success => {
        if(success.status == 201) {
          let indexParticipant = _.findIndex(this.participants, function(o){return o['user']._id == partner._id;});
          if(indexParticipant == -1) {
            this.participants.push({user: {name: partner.name, picture: partner.picture, _id: partner._id}, status: 'waiting'});
          }
          this.addFriends = false;
          this.friendSearch = '';
          this.search = [];
        } else {
          this.addFriends = false;
          this.friendSearch = '';
          this.search = [];
        }
      }, error => {
      })
  }

  searchRequest() {
    if(this.friendSearch.length > 0) {
    this.memberService.searchMember(this.friendSearch)
      .subscribe(success => {
        let users = success.data;
        this.search = [];
        for(let i = 0; i < success.data.length; i++) {
          for(let j = 0; j < this.participants.length; j++) {
            if(this.participants[j].user._id == success.data[i]._id) {
              success.data.splice(i, 1);
              break;
            }
          }
        }
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
        for(let i = 0; i < success.length; i++) {
          for(let j = 0; j < this.sites.length; j++) {
            if(success[i]._id == this.sites[j].site_id) {
              success.splice(i, 1);
              break;
            }
          }
        }
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
          let siteIndex = _.findIndex(this.localTravel.sites, function(o) { return o['site_id'] == site._id});
          if(siteIndex == -1) {
            this.sites.push({site_id:site._id, used_type:['transport']});
          }
          this.siteSearch = '';
          this.addSite = false;
          this.sitesRetrieved = [];
        }
      },
      error => {
        console.log('unable to add this site');
      }
    )
  }

  ngOnDestroy() {
  }

  lunchUpdateForm(){
    $('#myModal').modal('show');
  }

  updateName(){
    this.travelService.setName(this.localTravel._id, this.travel_name)
      .subscribe(success => {
        this.localTravel.name = this.travel_name;
        this.travel_name = '';
        $('#myModal').modal('hide');
      }, error => {});
  }
}
