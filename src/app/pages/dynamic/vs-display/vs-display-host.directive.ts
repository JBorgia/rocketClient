import { Directive, Type, ViewContainerRef, Input, ComponentFactoryResolver } from '@angular/core';
import {
  PartItemComponent,
  MessageItemComponent,
  UserItemComponent,
  DocumentItemComponent,
  WhiteboardIssueItemComponent,
  WhiteboardNoteItemComponent
} from './display-items/_index';

const componentMapper = {
  part: PartItemComponent,
  message: MessageItemComponent,
  comment: MessageItemComponent,
  user: UserItemComponent,
  document: DocumentItemComponent,
  whiteboardIssue: WhiteboardIssueItemComponent, 
  whiteboardNote: WhiteboardNoteItemComponent, 
};

@Directive({
  selector: '[vsresultshost]',
})
export class VsDisplayHostDirective {
  @Input('objectType') objectType: string;
  @Input('review') review: {};
  @Input('item') item: Type<any>;
  componentRef: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.objectType]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.item = this.item;
    if(this.review){
      this.componentRef.instance.review = this.review;
    }
  }
}
