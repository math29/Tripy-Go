/// <reference path="../../../../../../typings/d3/d3.d.ts" />

import {Component, Directive, ViewChild, ElementRef, Renderer, Input} from '@angular/core';


import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';

declare var d3:any;
declare var Datamap: any;

@Component({
    selector : 'transport-map',
    template : `
    <style>
      #map {height: 400px;}
    </style>
    <div class="map" id="map"></div>
        `
})
export class TransportMapCmp {
  _data: any;
  @ViewChild('myH3') myH3;
  @Input()
  set data(data: any){
    this._data = data;
    this.initData();
  }

  root: any;
  private map: any;

  public constructor(public renderer: Renderer, public el: ElementRef) {
  }

  public initMap(){
    document.getElementById('map').innerHTML = "";
    this.map = new Datamap({element: document.getElementById('map'),
    done: function(datamap){
      datamap.svg.call(d3.behavior.zoom().on("zoom",redraw));
      function redraw() {
        datamap.svg.selectAll("g").attr("transform", "translate(" + d3.event.translate +")scale(" + d3.event.scale + ")");
      }
    },
    fills: {
    defaultFill: 'rgb(90, 150, 200)',
    departure: '#00adef',
    arrival: '#f9676b'
    }});
  }

  ngAfterViewInit() {
    this.initMap();
    this.initData();
  }

  /**
   * Normalise la taille d'une location
   *
   */
  private normalize(size, max) {
    return size / max * 40;
  }

  public initData(){
    this.map = null;
    this.initMap();
    let paths = [];
    let cities = [];

    let maxLength = 0;
    for(let i = 0; i < this._data.length; i++) {
      maxLength = Math.max(maxLength, this._data[i].dest.length);
    }

    for(let i = 0; i < this._data.length; i++){
      cities.push({name: this._data[i].departure.name,
        latitude: this._data[i].departure.loc[0],
        longitude: this._data[i].departure.loc[1],
        radius: this.normalize(this._data[i].dest.length, maxLength),
        fillKey: 'departure'
      });
      for(let j = 0; j < this._data[i].dest.length; j++){
        cities.push({name: this._data[i].dest[j].name,
          latitude: this._data[i].dest[j].loc[0],
          longitude: this._data[i].dest[j].loc[1],
          radius: 10,
          fillKey: 'arrival'
        });
        paths.push(
          {origin: {
            latitude: this._data[i].departure.loc[0],
            longitude: this._data[i].departure.loc[1]
          },
          destination: {
            latitude: this._data[i].dest[j].loc[0],
            longitude: this._data[i].dest[j].loc[1]
          }
        });
      }
    }
    this.map.arc(paths);
    this.map.bubbles(cities, {
      popupTemplate: function(geo, data) {
        return '<div class="hoverinfo">' + data.name + '</div>';  }});
  }

}
