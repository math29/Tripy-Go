/// <reference path="../../../../../typings/socket.io-client/socket.io-client.d.ts" />
import { Injectable } from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import * as _ from 'lodash';
import * as io from 'socket.io-client';


@Injectable()
export class SocketService {
  //
  private socket: any;
  private listening: string[] = [];
  socketObservable$: Observable<any>;
  socketObserver: any;

  constructor() {
    if(localStorage.getItem('env') == 'prod'){
      console.log('prod');
      this.socket = io.connect('',{path:'http://tripygo-breizher.rhcloud.com/socket.io-client'});
    }else{
      console.log('dev');
      this.socket = io.connect('',{path:'/socket.io-client'});
    }
    this.socketObservable$ = new Observable(observer => this.socketObserver = observer).share();
  }

  /**
   * Add a listener to socket channel
   *
   * @param channel: channel to listen
   */
  addListener(channel: string){
    if(!_.find(this.listening, function(o){return o == channel;})){
      this.listening.push(channel);
      this.socket.on(channel, (data:any) => {
        if(this.socketObserver) {
          let response = {
            'channel': channel,
            'data': data
          };
          this.socketObserver.next(response);
        }else{
          console.error('No observer set');
        }
      });
    }
  }

  removeListener(channel: string){
    console.log('remove channel: '+ channel);
    this.socket.removeAllListeners(channel);
    _.pull(this.listening, channel);
  }

  exit(){

  }

}
