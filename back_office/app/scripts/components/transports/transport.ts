/// <reference path="../../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../../../typings/socket.io-client/socket.io-client.d.ts" />

import {Component, OnInit, ElementRef,OnDestroy} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Response} from 'angular2/http';
import {TransportMapCmp} from './transportMap';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import * as io from 'socket.io-client';

//declare var jQuery: JQueryStatic;
//declare var $: JQueryStatic;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'transport-type',
  templateUrl: 'views/components/transport/main.html',
  styleUrls: ['back/lib/bootstrap-iconpicker/bootstrap-iconpicker/css/bootstrap-iconpicker.min.css'],
  providers: [],
  directives: [ROUTER_DIRECTIVES, TransportMapCmp]
})
export class TransportCmp{
    private errors: any=[];
    private messages: any=[];

    private keys:any;
    private orderby:string='';
    private orderOptions : string[] = ['+','-'];
    private orderType = this.orderOptions[0];
    private transports: any[];
    private selection: any;
    private socket:any;

    constructor(){
      let host = window.location.origin;
      this.socket = io.connect('',{path:'/socket.io-client'});
    }

    ngOnInit(){
      this.getTransports();
      // appelé lorsqu'un type de transport est supprimé
      this.socket.on('transportType:remove',
        (data:any)=>{
          for(let i = 0; i < this.transports.length; i++){
            if(this.transports[i]._id == data._id){
              this.transports.splice(i,1);
              break;
            }
          }
        });
    }

    ngOnDestroy(){
      this.socket.removeAllListeners('transport:remove');
      this.socket.removeAllListeners('transport:save');
    }

   textIsValid(text){
      var valid = true;

      if(typeof text === 'undefined' || text.length === 0 ){
        valid = false;
      }

      return valid;
    }

    getTransports(){
      this.transports =  [{
        _id:1,
        type:{
          'name':'Automobile',
          'img':'fa-car'
        },
        distance: 1000,
        departure:{
          'name':'Paris',
          'loc':[0,0]
        },
        arrival:{
          name:'Bruxelles',
          loc: [1,1]
        },
        class: 'premier',
        cost:1000,
        departure_time: '23/03/2016'
      }
      ]
    }

}
