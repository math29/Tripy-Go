import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';

import { AuthService } from '../../tripy_go_lib/services/auth.service'
import { NotificationCmp } from './notification/notification.component';
import { Stepbar } from './stepbar/stepbar';
import { SocketService } from '../../tripy_go_lib/services/socket.service';
import { NotificationService } from '../../services/notifications.service';

@Component({
	selector: 'header',
	templateUrl: 'app/components/header/header.html',
	styleUrls: ['app/components/header/header.css'],
	providers: [],
	directives: [ROUTER_DIRECTIVES, Stepbar, NotificationCmp],
	pipes: []
})
export class Header {
	routesStepBar: any;
	step: number = 0;
	_router: Router;
	notifications: any = [];

	constructor(private _auth: AuthService, _router: Router, private socketService: SocketService, private notificationService : NotificationService) {
		this._router = _router;
		this.socketService.socketObservable$.subscribe(updateCompany => {
			let response = updateCompany;
			if(response.channel == 'notifications'){
				this.notifications = response.data;
			}
		});
	}

	ngOnInit() {
		this.routesStepBar = [
			'transport/listing',
			'transport/research'
		];

		// Un peu forcé malgé moi de faire ce petit parcours des différentes routes qui composent notre stepbar
		// JE vérifie pour chacune d'entre elles si elle est contenu dans la route actuelle (gère par la même occasion le cas où nous aurions des paramètres)
		this._router.subscribe((path) => {
			this.step = 0;
			for (let i = 0; i < this.routesStepBar.length; i++){
				if (path.indexOf(this.routesStepBar[i]) > -1)
					this.step = i+1;
			}
		});
	}

	/**
	 * Aquitte une notification
	 *
	 * @param notification : notificiation à aquitter
	 */
	ackNotif( notification : any) {
		if(notification.template != 'trip-ack') {
			this.notificationService.ackNotification(notification._id)
				.subscribe(success => {
					for(let i = 0; i < this.notifications.length; i++) {
						if(this.notifications[i]._id == notification._id) {
							this.notifications.splice(i, 1);
							// on redirige l'utilisateur vers le lien associé à la notification
							if(notification.link) {
								this._router.navigateByUrl(notification.link);
							}
							return;
						}
					}
				}, error => {});
		}

	}
}
