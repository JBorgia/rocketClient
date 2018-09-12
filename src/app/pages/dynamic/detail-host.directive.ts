import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[detailhost]',
})
export class DetailHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
