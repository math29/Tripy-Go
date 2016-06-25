/// <reference path="../../../../../../typings/jquery/jquery.d.ts" />

import {Component, OnInit, ElementRef,OnDestroy} from '@angular/core';
import {NgForm} from '@angular/common';
import {Response, Http} from '@angular/http';
import {TransportMapCmp} from './transportMap';
import {RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import{AgregatorService} from '../../services/agregator';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

import * as moment from 'moment';

//declare var jQuery: JQueryStatic;
//declare var $: JQueryStatic;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'transport-type',
  templateUrl: 'views/components/transport/main.html',
  styleUrls: ['back/lib/bootstrap-iconpicker/bootstrap-iconpicker/css/bootstrap-iconpicker.min.css'],
  providers: [AgregatorService],
  directives: [ROUTER_DIRECTIVES, TransportMapCmp ,DATEPICKER_DIRECTIVES]
})
export class TransportCmp{
    private errors: any=[];
    private messages: any=[];

    private agregation: any;
    private keys:any;
    private orderby:string='';
    private orderOptions : string[] = ['+','-'];
    private orderType = this.orderOptions[0];
    private transports: any[];
    private selection: any;

    public dt:Date = new Date();
    public dt_end:Date = new Date();
    private today_date:Date = new Date();
    filterDate: boolean;
    public minDate:Date = void 0;
    public events:Array<any>;
    public tomorrow:Date;
    public afterTomorrow:Date;
    public formats:Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
    public format:string = this.formats[0];
    slideValue: number[] = [0, 40000];
    public dateOptions:any = {
      formatYear: 'YY',
      startingDay: 1
    };
    private opened:boolean = false;

  public constructor(private _agregatorService: AgregatorService, private elementRef: ElementRef) {
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    this.events = [
      {date: this.tomorrow, status: 'full'},
      {date: this.afterTomorrow, status: 'partially'}
    ];


  }

  public getDate():number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }

  public getDateEnd():number {
    return this.dt_end && this.dt_end.getTime() || new Date().getTime();
  }
  public today():void {
    this.dt = new Date();
    if(this.dt_end.getTime() > this.dt.getTime()){
      this.dt_end = new Date();
    }
  }

  public alert():void{
    alert("Date: "+ this.dt);
  }

  // todo: implement custom class cases
  public getDayClass(date:any, mode:string):string {
    if (mode === 'day') {
      let dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (let i = 0; i < this.events.length; i++) {
        let currentDay = new Date(this.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return this.events[i].status;
        }
      }
    }

    return '';
  }

  public disabled(date:Date, mode:string):boolean {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  }

  public open():void {
    this.opened = !this.opened;
  }

  public clear():void {
    this.dt = void 0;
    this.dt_end = void 0;
  }

  public toggleMin():void {
    this.dt = new Date(this.minDate.valueOf());
  }

  ngOnInit(){
    this.getTransports();
    this.getAgregation();

    var $amount = jQuery(this.elementRef.nativeElement).find(".amount");
          jQuery(this.elementRef.nativeElement).find(".slider").slider({
              range: true,
              orientation: "horizontal",
              min: 0,
              max: 40000,
              values: [0, 40000],
              slide: (event, ui) => {
                  this.slideValue = ui.values;
                  $amount.val(ui.value);
              }
          });
    }

    getAgregation(){
      let options : any = {distance: {min: this.slideValue[0], max: this.slideValue[1]}};
      if(this.filterDate){
        options.date = {};
        options.date.min = this.dt.toISOString();
        this.dt_end.setMinutes(59);
        this.dt_end.setHours(23);
        options.date.max = this.dt_end.toISOString();
      }
      this._agregatorService.getTransportAgregation(options)
          .subscribe(success => {this.agregation = success; }
          , error=> this.errors.push('Impossible de récupérer les statistiques'))
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
