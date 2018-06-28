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
import { ModalInterface } from './modal.interface';

@Component({
  selector: 'app-flex-table-modal',
  templateUrl: './flex-table-modal.component.html',
  styleUrls: ['./flex-table-modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  currentAdIndex = -1;
  @ViewChild(ModalDirective) adHost: ModalDirective;
  interval: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public dialogRef: MatDialogRef<ModalComponent>,
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
    (<ModalInterface>componentRef.instance).data = this.data.obj;
  }
}
