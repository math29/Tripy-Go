import { Injectable, OnDestroy } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as _ from 'lodash';
import * as io from 'socket.io-client';
// for Push notifications
declare var Push : any;

@Injectable()
export class SocketService implements OnDestroy{
  //
  private socket: any;
  private listening: string[] = [];
  private url:string = '';
  socketObservable$: Observable<any>;
  socketObserver: any;
  private config: SocketIOClient.ConnectOpts;
  private notifications : any = [];

  constructor() {
    this.config = {};
    this.config.path = '/socket.io-client';
    this.config.reconnection = true;
    this.config.reconnectionDelay = 1000;
    this.url = window.location.origin;
    this.socket = io.connect(this.url, this.config);
    this.socket.removeAllListeners();
    this.socketObservable$ = new Observable(observer => this.socketObserver = observer).share();
    if(localStorage.getItem('jwt')) {
      this.connexion();
    }
  }

  connexion(){
    this.config.query = 'token='+localStorage.getItem('jwt');
    this.socket.removeAllListeners();
    this.socket.disconnect();
    this.socket = io.connect(this.url, this.config);
    this.socket.emit('authenticate', {token: localStorage.getItem('jwt')});

    this.socket.on('notifications', (data: any) => {
      let new_notifs = this.addNotifications(data);
      for(let i = 0; i < new_notifs.length; i++) {
        this.createNotification(new_notifs[i].title, new_notifs[i].body, '');
      }
      this.socketObserver.next({channel:'notifications', data: data});

    });
  }

  /**
   * Filter to show only new notifications
   *
   * @param {data} notifications received by socket
   * @return new notifications array
   */
  addNotifications(data : any) : any{
    let newNotifs = [];
    for(let i = 0; i < data.length; i++) {
      let index = _.findIndex(this.notifications, function(o){return o['_id'] == data[i]['_id'];});
      if(index == -1) {
        newNotifs.push(data[i]);
        this.notifications.push(data[i]);
      }
    }
    return newNotifs;
  }

  createNotification(title: string, body: string, img: string) {
    Push.create(title, {
      body: body,
      timeout: 5000
    });
  }

  addListener(channel){
    if(!this.socket) {
      this.connexion();
    }
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

  ngOnDestroy(){
    this.socket.removeAllListeners();
    this.socket.disconnect();
    alert('destroyed');
  }

}
