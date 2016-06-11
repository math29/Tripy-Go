import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Jsonp } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { SocketService } from './socket.service';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map'

declare var window: any; 

window.callback = () => {
  console.log('callback fired');
};

// DONT MODIFY THIS FILE IF YOU ARE NOT IN REAL TRIPYGO LIB FOLDER (./)

@Injectable()
export class GoogleService {
  
  googleApiKey: String = "AIzaSyCbbSgj5Sk0_eiC9TAIbr2Un_trdaUOuwY";
  options: RequestOptions;

  constructor(private _http: Http, private _jsonp: Jsonp) {
    let headers = new Headers({
    });
    let headers_post = new Headers({
    'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({ headers: headers_post });
  }

  public populateLocation(location_id, place_id) {
    console.log(location_id);
    console.log(place_id);
    this.getPlaceDetails(place_id);
  }

  getPlaceDetails(place_id) {
    // this._http.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${this.googleApiKey}`, this.options)
    //   .map(res => res.json())
    //   .subscribe(
    //     res => {
    //       console.log(res.json());
    //     }
    //   );

    let headers_post = new Headers({
      'Content-Type': 'application/json'
    });

    this._jsonp.request(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${this.googleApiKey}&callback=JSONP_CALLBACK`, { method: 'Get' })
      .map(res => res.json())
      .subscribe(response => {
        console.log(JSON.parse(response));
      }, error => {
        console.log(error);
      }); 

    // this._http.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${this.googleApiKey}`, this.options)
    //   .map(res => res.json())
    //   .subscribe(details => {
    //     console.log(details);
    //   })

  }

  getPlacePhoto() {

  }
}
