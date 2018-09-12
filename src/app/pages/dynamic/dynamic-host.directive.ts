import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamichost]',
})
export class DynamicHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
