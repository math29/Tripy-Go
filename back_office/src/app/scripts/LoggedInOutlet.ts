import {Directive, Attribute, ViewContainerRef, DynamicComponentLoader} from '@angular/core';
import {Router, RouterOutlet, ComponentInstruction} from '@angular/router-deprecated';

@Directive({
  selector: 'router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: any;
  private parentRouter: Router;

  constructor(_elementRef: ViewContainerRef, _loader: DynamicComponentLoader,
              _parentRouter: Router, @Attribute('name') nameAttr: string) {
    super(_elementRef, _loader, _parentRouter, nameAttr);
    this.parentRouter = _parentRouter;
    this.publicRoutes = {
      '': true,
      '/login': true
    };
  }

  activate(instruction: ComponentInstruction) {
    let url = this.parentRouter.lastNavigationAttempt;
    if (!this.publicRoutes[url] && !localStorage.getItem('jwt')) {
      this.parentRouter.navigateByUrl('/login');
    }
    return super.activate(instruction);
  }
}
