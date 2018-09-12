import { Directive, Type, ViewContainerRef, Input, ComponentFactoryResolver } from '@angular/core';
import { PartItemComponent } from './part-item/part-item.component';

const componentMapper = {
    part: PartItemComponent,
    // document: DocumentItemComponent, 
  };

@Directive({
    selector: '[vsresultshost]',
})
export class VsResultsHostDirective  {
    @Input('component') component: string;
    @Input('item') item: Type<any>;
    componentRef: any;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef
    ) { }
    
    ngOnInit() {
      const factory = this.resolver.resolveComponentFactory(
        componentMapper[this.component]
      );
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.item = this.item;
    }
  }
  