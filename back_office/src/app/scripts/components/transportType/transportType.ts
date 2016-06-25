/// <reference path="../../app.ts"/>
/// <reference path="../../../../../../typings/socket.io-client/socket.io-client.d.ts" />

import {Component, OnInit, ElementRef,OnDestroy} from '@angular/core';
import {NgForm} from '@angular/common';
import {Response} from '@angular/http';
import {TransportTypeService} from '../../services/transportTypeService';
import {RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {SocketService} from '../../tripy-lib/index';

//declare var jQuery: JQueryStatic;
//declare var $: JQueryStatic;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'transport-type',
  templateUrl: 'views/components/transportType/main.html',
  styleUrls: ['back/lib/bootstrap-iconpicker/bootstrap-iconpicker/css/bootstrap-iconpicker.min.css'],
  providers: [TransportTypeService],
  directives: [ROUTER_DIRECTIVES]
})
export class TransportTypeCmp{
    private errors: any=[];
    private messages: any=[];

    private typeEdit: any;
    private keys:any;
    private orderby:string='';
    private orderOptions : string[] = ['+','-'];
    private orderType = this.orderOptions[0];
    private transportTypes: any[];
    private selection: any;

    constructor(private el: ElementRef,private _transportTypeService: TransportTypeService, private socketService: SocketService){
      this.socketService.socketObservable$.subscribe(socketResponse => {
        switch(socketResponse.channel) {
          case 'transportType:remove':
            this.onRemoveTransport(socketResponse.data);
            break;
          case 'transportType:save':
            this.onSaveTransport(socketResponse.data);
            break;
        }
      });
      this.socketService.addListener('transportType:remove');
      this.socketService.addListener('transportType:save');
    }

    onRemoveTransport(data: any) {
      for(let i = 0; i < this.transportTypes.length; i++){
        if(this.transportTypes[i]._id == data._id){
          this.transportTypes.splice(i,1);
          break;
        }
      }
    }

    onSaveTransport(data: any) {
      let index = this.findTransportIndex(data._id);
      if(index > -1){
        this.transportTypes[index] = data;
      }else{
      this.transportTypes.push(data);
      }
    }

    ngOnInit(){
      this.getTransportTypes();
      // appelé lorsqu'un type de transport est supprimé
    }



    initNewTransportType(){
      this.typeEdit = {name:"",img:""};


      // must wait because before, component does not exist
      this.initIconPicker();

    }

    initIconPicker(){
      let millisecondsToWait = 250;
      let test:any = this.typeEdit;
      setTimeout(function() {
      let iconPicker:any = $('#typeIcon').iconpicker({icon:test.img,iconset: 'fontawesome'})
        iconPicker.on('change', function(e){
            test.img = e.icon;
        });
      }, millisecondsToWait);
    }

    ngOnDestroy(){
      this.socketService.removeListener('transportType:remove','transportType:save');
    }

   textIsValid(text){
      var valid = true;

      if(typeof text === 'undefined' || text.length === 0 ){
        valid = false;
      }

      return valid;
    }

    edit(type:any){
      this.typeEdit = type;

      this.initIconPicker();
    }

    saveTransportType(transportType: any){
      this._transportTypeService.saveTransportType(transportType)
        .subscribe(data => {this.messages.push("Moyen de transport sauvegardé"); this.typeEdit = null;},
        errors => this.errors.push("Impossible de sauvegarder le moyen de transport"));
    }

    getTransportTypes(){
        this._transportTypeService.getTransportTypes()
        .subscribe(data =>
        {
          this.transportTypes = data;
          if(this.transportTypes.length > 0){
            this.keys = Object.keys(this.transportTypes[0]);
            this.keys.splice(0,1);
            this.selection = this.keys[1];
            this.orderby = this.keys[1];
          }
        },
        errors => console.log(errors));
    }

    /**
     * Retourne l'index d'une langue dans la liste des langues
     *
     * @param id: id de la langue à trouver
     *
     * @return index: index de la langue ou -1 si non trouvée
     */
    findTransportIndex(id:string):number{
      for(let i = 0; i < this.transportTypes.length; i++){
        if(this.transportTypes[i]._id == id){
          return i;
        }
      }
      return -1;
    }

    deleteTransportType(transportType:any){
      this._transportTypeService.deleteTransportType(transportType).subscribe();
    }


}
