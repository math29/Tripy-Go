import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Jsonp } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { SocketService } from './socket.service';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map'

// DONT MODIFY THIS FILE IF YOU ARE NOT IN REAL TRIPYGO LIB FOLDER (./)

@Injectable()
export class GoogleService {
  
  googleApiKey: String = "AIzaSyCbbSgj5Sk0_eiC9TAIbr2Un_trdaUOuwY";
  options: RequestOptions;

  constructor(private _jsonp: Jsonp) {
    let headers = new Headers({
    });
    this.options = new RequestOptions({ headers: headers });
  }

  public populateLocation(location_id, place_id) {
    console.log(location_id);
    console.log(place_id);
    this.getPlaceDetails(place_id);
  }

  getPlaceDetails(place_id) {
    this._jsonp.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${this.googleApiKey}`)
      .subscribe(
        res => {
          console.log(res.json());
        }
      );
    // this._http.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${this.googleApiKey}`, this.options)
    //   .map(res => res.json())
    //   .subscribe(details => {
    //     console.log(details);
    //   })

  }

  getPlacePhoto() {

  }
}
