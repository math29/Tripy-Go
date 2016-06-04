import {Component, OnInit, OnDestroy} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../tripy-lib/services/auth.service';
import {MdEditor} from '../../tripy-lib/components/md-editor/md-editor';
import {NgForm} from '@angular/common';
import {Response} from '@angular/http';
import { RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';


declare var tinyMCE : any;

@Component({
  selector: 'languages',
  templateUrl: 'scripts/+mail/components/mail.component.html',
  providers: [],
  directives: [ROUTER_DIRECTIVES, MdEditor],
  pipes: []
})
export class MailCmp{
    private errors: any=[];
    private messages: any=[];

    private destinataire : string = "";
    private body : string = "";
    private subject : string = "";

    constructor(private http : Http, private authService : AuthService){

    }

    getHeaders(){
      let headers = new Headers(this.authService.getBearerHeaders());
        let options = new RequestOptions({ headers: headers });
        return options
    }

    sendMail() {
      let bod = {to: [this.destinataire], subject: this.subject, text: this.body, html: this.body};
      this.http.post('/api/mail', JSON.stringify(bod), this.getHeaders())
        .map(res => <any>res.json())
        .subscribe(success => {
          this.messages.push('Mail envoyé');
          this.body = "";
          this.destinataire = "";
          this.subject = "";
          tinyMCE.activeEditor.setContent('');
        },
      error => {this.errors.push("Impossible d'envoyer un mail");});
    }

    descriptionChanged(newDescription) {
      this.body = newDescription;
    }


}
