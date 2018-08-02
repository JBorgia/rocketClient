import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDashboardHost]',
})
export class DashboardDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
