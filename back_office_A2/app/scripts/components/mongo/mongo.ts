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
  status: any;

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
        this.db_info.avgObjSize = this.avgSize(this.db_info.avgObjSize);
        this.db_info.dataSize = this.sizeToMb(this.db_info.dataSize);
      }, errors => console.log(errors));

    this.mongoService.getDBStatus()
      .subscribe(response => {
        this.status = response;
        this.status = JSON.parse(this.status._body);
      }, errors => console.log(errors));

    this.mongoService.getDBStats()
          .subscribe(response => {
            this.stats = response;
            this.stats = JSON.parse(this.stats._body);
            for(var i=0; i<this.stats.length; i++){
              this.stats[i].avgObjSize = this.avgSize(this.stats[i].avgObjSize);
              this.stats[i].size = this.sizeToMb(this.stats[i].size);
            }
          }, errors => console.log(errors));
  }

  avgSize(data){
    return Math.ceil(data)+'Kb'
  }

  sizeToMb(data){
    return Math.floor(data / 10000) + 'Mb'
  }
}
