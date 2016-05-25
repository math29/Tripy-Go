import {Component} from '@angular/core';
import {AuthService} from '../../tripy-lib/services/auth.service';

@Component({
  selector: 'home',
  templateUrl: 'scripts/+home/components/home.component.html',
  providers: [],
  directives: [],
  pipes: []
})
export class HomeCmp{

  constructor(private _authService: AuthService){//this.getRate();
  }

  logout(){
    this._authService.logout();
  }
}
