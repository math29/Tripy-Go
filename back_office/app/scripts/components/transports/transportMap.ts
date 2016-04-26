/// <reference path="../../../../../typings/d3/d3.d.ts" />

import {Component, Directive, ViewChild, ElementRef, Renderer, Input} from 'angular2/core';
//import * as d3 from 'd3';

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
    @ViewChild('myH3') myH3;
    @Input() data: any;
    root: any;

    constructor(public renderer: Renderer, public el: ElementRef){}

    ngAfterViewInit() {
      var map = new Datamap({element: document.getElementById('map'),
      fills: {
      defaultFill: 'rgb(90, 150, 200)',
      departure: '#00adef',
      arrival: '#f9676b'
    }});
      let paths = [];
      let cities = [];
      for(let i = 0; i < this.data.length; i++){
        cities.push({name: this.data[i].departure.name,
          latitude: this.data[i].departure.loc[0],
          longitude: this.data[i].departure.loc[1],
          radius: 10 * this.data[i].dest.length,
          fillKey: 'departure'
        });
        for(let j = 0; j < this.data[i].dest.length; j++){
          cities.push({name: this.data[i].dest[j].name,
            latitude: this.data[i].dest[j].loc[0],
            longitude: this.data[i].dest[j].loc[1],
            radius: 10,
            fillKey: 'arrival'
          });
          paths.push(
            {origin: {
              latitude: this.data[i].departure.loc[0],
              longitude: this.data[i].departure.loc[1]
            },
            destination: {
              latitude: this.data[i].dest[j].loc[0],
              longitude: this.data[i].dest[j].loc[1]
            }
          });
        }
      }
      map.arc(paths);
      map.bubbles(cities, {
  popupTemplate: function(geo, data) {
    return '<div class="hoverinfo">' + data.name + '</div>';  }});
    }
}
