/// <reference path="../../../../../typings/socket.io-client/socket.io-client.d.ts" />

import {Component, OnInit, OnDestroy} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Response} from 'angular2/http';
import {UserService} from '../../services/userService';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {OrderByPipe} from '../../pipes/orderby';
//import {ModalCmp} from '../../tripy-lib/components/modal/modal';
import {StarsRateCmp} from '../../tripy-lib/components/rate/starsRate';
import * as io from 'socket.io-client';

@Component({
  selector: 'languages',
  templateUrl: 'views/components/users/main.html',
  providers: [UserService],
  directives: [ROUTER_DIRECTIVES, StarsRateCmp],
  pipes: [OrderByPipe]
})
export class UsersCmp{
    private errors: any=[];
    private messages: any=[];

    private userEdit: any;
    private roles:string[];
    private keys:any;
    private orderby:string='';
    private orderOptions : string[] = ['+','-'];
    private orderType = this.orderOptions[0];
    private users: any[];
    private selection: any;
    private socket:any;

    constructor(private _userService: UserService){
      let host = window.location.origin;
      this.socket = io.connect('',{path:'/socket.io-client'});
    }



    logError(err) {
      console.error('There was an error: ' + err);
    }
    ngOnInit(){
      this.getRoles();
      this.getUsers();
      // appelé lorsqu'un language est supprimé
      this.socket.on('user:remove',
        (data:any)=>{
          for(let i = 0; i < this.users.length; i++){
            if(this.users[i]._id == data._id){
              this.users.splice(i,1);
              break;
            }
          }
        });

    }

    ngOnDestroy(){
      this.socket.removeAllListeners('user:remove');
      this.socket.removeAllListeners('user:save');
    }

   textIsValid(text){
      var valid = true;

      if(typeof text === 'undefined' || text.length === 0 ){
        valid = false;
      }

      return valid;
    }

    edit(user:any){
      this.userEdit = user;
    }

    update_role(user:any){
      this._userService.changeUserRole(user, user.role).subscribe(data=>{this.messages.push("User updated"); this.userEdit = null;}, errors=>this.errors.push("Impossible de mettre à jour l'utilisateur"));
    }

    getUsers(){
        this._userService.getUsers()
        .subscribe(data =>
        {
          this.users = data;
          if(this.users.length > 0){
            this.keys = Object.keys(this.users[0]);
            this.keys.splice(0,1);
            this.selection = this.keys[1];
            this.orderby = this.keys[1];
          }
          // set socket to listen languages saved
          this.socket.on('user:save', (data:any)=>{
            let index = this.findUserIndex(data._id);
            if(index > -1){
              this.users[index] = data;
            }else{
            this.users.push(data);
            }
          });
        },
        errors => console.log(errors));
    }

    getRoles(){
      this._userService.getRoles()
        .subscribe(data=>this.roles = data.roles, errors => this.errors.push(errors));
    }


    /**
     * Retourne l'index d'une langue dans la liste des langues
     *
     * @param id: id de la langue à trouver
     *
     * @return index: index de la langue ou -1 si non trouvée
     */
    findUserIndex(id:string):number{
      for(let i = 0; i < this.users.length; i++){
        if(this.users[i]._id == id){
          return i;
        }
      }
      return -1;
    }

    deleteUser(user:any){
      this._userService.deleteUser(user).subscribe();
    }


}
