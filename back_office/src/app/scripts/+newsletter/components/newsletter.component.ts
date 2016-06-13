import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { SubscriberService } from '../services/subscribers.service';

@Component({
    selector: 'newsletter',
    templateUrl: 'scripts/+newsletter/components/newsletter.component.html',
    directives: [],
    providers: [SubscriberService],
    styleUrls: [],
    pipes: []
})

export class NewsletterComponent implements OnInit, OnDestroy {
  private subscribers : any;
  private token: string;

  constructor( private subscriberService : SubscriberService) {
    this.token = localStorage.getItem('jwt');
  }

  ngOnInit() {
    this.subscriberService.getAll()
      .subscribe(success => {
        this.subscribers = success.data;
      });
  }

  ngOnDestroy() {
  }

}
