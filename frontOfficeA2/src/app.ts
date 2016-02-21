import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {
	ROUTER_PROVIDERS,
	ROUTER_PRIMARY_COMPONENT
} from 'angular2/router';
import {FrontOfficeA2App} from './app/front-office-a2';


bootstrap(FrontOfficeA2App, [
	ROUTER_PROVIDERS,
	provide(ROUTER_PRIMARY_COMPONENT, {useValue: FrontOfficeA2App})
]);
