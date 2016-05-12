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
  private config: SocketIOClient.ConnectOpts;

  constructor() {
    this.config = {};
    this.config.path = '/socket.io-client';
    this.config.reconnection = true;
    this.config.reconnectionDelay = 1000;

    if(localStorage.getItem('env') == 'prod'){
      this.config.path = 'http://tripygo-breizher.rhcloud.com/socket.io-client';
    }
    this.socket = io.connect('', this.config);

    this.socketObservable$ = new Observable(observer => this.socketObserver = observer).share();
  }



  addListener(channel){
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

  removeListener(...channels) {
    for(let i = 0; i < channels.length; i++){
      let channel = channels[i];
      this.socket.removeAllListeners(channel);
      _.pull(this.listening, channel);
    }
  }

  exit(){

  }

}
