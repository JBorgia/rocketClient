import {
  Component,
  ComponentFactoryResolver,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ModalDirective } from './modal.directive';
import { ModalInterface } from './modal.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  currentAdIndex = -1;
  @ViewChild(ModalDirective) modalHost: ModalDirective;
  interval: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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

    const viewContainerRef = this.modalHost.viewContainerRef;
    viewContainerRef.clear();

    delete this.data.componentClass;
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<ModalInterface>componentRef.instance).data = this.data;
  }
}
