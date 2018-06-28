import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  OnDestroy,
  Input,
  ComponentFactoryResolver,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ModalDirective } from '../flex-table-modal/modal.directive';
import { ModalComponent } from './modal.component';

@Component({
  selector: 'app-flex-table-modal',
  templateUrl: './flex-table-modal.component.html',
  styleUrls: ['./flex-table-modal.component.scss'],
})
export class FlexTableModalComponent implements OnInit, OnDestroy {
  currentAdIndex = -1;
  @ViewChild(ModalDirective) adHost: ModalDirective;
  interval: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public dialogRef: MatDialogRef<FlexTableModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log('data', this.data);
    this.loadComponent();
  }

  ngOnDestroy() {
    this.data = undefined;
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.data.componentClass
    );

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<ModalComponent>componentRef.instance).data = this.data.obj;
  }
}
