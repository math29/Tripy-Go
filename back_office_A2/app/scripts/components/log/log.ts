import {Component} from 'angular2/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Response} from 'angular2/http';
//import {PAGINATION_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import {LogService} from '../../services/log.service';
import {OrderByPipe} from '../../pipes/orderby';
import {FilterLogPipe} from '../../pipes/filter';
import {Location, RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'log',
  templateUrl: 'views/components/logs/main.html',
  providers: [LogService],
  directives: [ROUTER_DIRECTIVES],
  pipes: [OrderByPipe, FilterLogPipe]
})
export class LogCmp{

    errors:any = [];
    messages:any = [];
    keys: string[] = [];
    orderby: string ='';
    orderOptions: string[] = ['+','-'];
    orderType: string = this.orderOptions[0];
    logs :any;
    level:string = 'All';
    pagination:any = {maxPage:1};
    query = '';
    url:any;
    stats:any;
    page: number = 1;
    temp: any;

    constructor(private _logService: LogService){}

    range(num:number){
      var array = new Array(num);
      return array;
    }

    createDownloadURL(){
      var blob = new Blob([ JSON.stringify(this.logs) ], { type : 'application/json' });

      this.url = window.URL.createObjectURL( blob );
    }

    get(){
      var getQuery = this.page+'';
      if(this.query.length > 0){
        getQuery = getQuery + '/' + this.query;
      }
      this._logService.getLogsByPage(this.level, getQuery)
        .subscribe(getResponse => {
          this.temp = getResponse;
          this.temp = JSON.parse(this.temp._body);

          this.stats = this.temp.stats;
          this.pagination = this.temp.pagination;
          this.logs = this.temp.logs;
          this.createDownloadURL();
          this.keys = Object.keys(this.logs[0]);
          this.keys.splice(this.keys.length-1, 1);
          this.orderby = this.keys[1];
        },
        errors => {
          console.log(errors);
          this.errors.push("Erreur lors de la récupération des logs");
        })
    }

    drop(){
      this._logService.dropLogs()
        .subscribe(success => {
          this.messages.push('Base des logs vidée');
          this.logs = [];
        },
        errors => {
          this.errors.push('Erreur inconnue');
        });
    }

    deleteLog(log){
      this._logService.deleteLog(log._id)
        .subscribe(success => {
          this.messages.push('Log '+ log._id + ' supprimé avec succés');
          for(var i = 0; i < this.logs.length; i++){
            if(this.logs[i]._id == log._id){
              this.logs.splice(i, 1);
            }
          }
        },
        errors => {
          this.errors.push('Impossible de supprimer le log '+ log._id);
        });
    }


    ngOnInit(){
      this.get();
    }



    scrollTo(id) {
          var anchor = document.getElementById(id);
          //var container = angular.element(document.getElementById('scroll-container'));
          //window.container.scrollToElement(anchor, 0, 800);
    };

    getClassFromInfo(log){
      if(typeof log !== 'undefined'){
        if(!this.textIsValid(log.message) || !this.textIsValid(log.timestamp) || !this.textIsValid(log.level)){
          return 'danger';
        }
      }else{
        return 'danger';
      }
    };

   textIsValid(text){
      var valid = true;

      if(typeof text === 'undefined' || text.length === 0 ){
        valid = false;
      }

      return valid;
    }
}
