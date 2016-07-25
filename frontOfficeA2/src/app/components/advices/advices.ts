import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { Advice } from './components/advice';
import { AdviceService } from '../../services/advice.service';

@Component({
	selector: 'advices',
	templateUrl: 'app/components/advices/advices.html',
	styleUrls: ['app/components/advices/advices.css'],
	providers: [ AdviceService ],
	directives: [ROUTER_DIRECTIVES, Advice],
	pipes: []
})
export class Advices implements OnInit {
  private advices: any;

	constructor(private _router: Router, private adviceService: AdviceService) { }

  ngOnInit() {
    this.adviceService.getAdvices().subscribe(res => this.advices = res);
  }

}
