import {Component, OnInit} from 'angular2/core';
import {StatsCmp} from '../utils/stats';
import {MongoService} from '../../services/mongo.service';
import {Location, RouteConfig, RouterLink, Router,Route,  ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'mongo',
  templateUrl: 'views/components/mongo/main.html',
  providers: [MongoService],
  directives: [ROUTER_DIRECTIVES, StatsCmp],
  pipes: [],
  inputs: []
})
export class MongoCmp{
  db_info: any;
  host: any;
  stats: any;

  constructor(private router: Router, private mongoService: MongoService){}

  ngOnInit(){
    this.mongoService.getHost()
      .subscribe(response => {
        this.host = response;
        this.host = JSON.parse(this.host._body);
        }, errors => console.log(errors));

    this.mongoService.getDBInfo()
      .subscribe(response => {
        this.db_info = response;
        this.db_info = JSON.parse(this.db_info._body);
      }, errors => console.log(errors));
  }

}
