/// <reference path="../../../../../typings/d3/d3.d.ts" />

import {Component, Directive, ViewChild, ElementRef, Renderer} from 'angular2/core';
//import * as d3 from 'd3';

declare var d3:any;

@Component({
    selector : 'transport-map',
    template : `<h3 #myH3>some text</h3>
    <div id="map"></div>
        `,
})
export class TransportMapCmp {
    @ViewChild('myH3') myH3;

    constructor(public renderer: Renderer, public el: ElementRef){ }

    ngAfterViewInit() {
      var w = 1280,
    h = 800;

    var projection = d3.geo.mercator()
      /*.mode("equidistant")
      .origin([-98, 38])
      .scale(100)
      .translate([640, 360]);*/
      .scale((w + 1) / 2 / Math.PI)
    /*.translate([w / 2, h / 2])
    .precision(.1);*/

      var path = d3.geo.path()
      .projection(projection);



      var svg = d3.select("#map").insert("svg:svg", "h2")
        .attr("width", w)
        .attr("height", h);
      var states = svg.append("svg:g")
        .attr("id", "states");
        //this.renderer.setElementStyle(this.myH3.nativeElement, 'background-color', 'blue');
        d3.json("./views/components/transport/countries.geo.json", function(collection) {
          console.log(collection);
          states.selectAll("path")
          .data(collection.features)
          .enter().append("svg:path")
          .attr("d", path);
});
    }
}
