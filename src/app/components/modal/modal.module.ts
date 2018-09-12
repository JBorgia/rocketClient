import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CreateMessageFormComponent,
  SelectEmployeeFormComponent,
  UserFormComponent,
  WhiteboardIssueFormComponent,
  ReviewCloseFormComponent,
  DocumentCloseFormComponent,
 } from '@app/forms';
import { EditComponent } from '@components/edit/edit.component';
import { FormModule } from '@forms/form.module';

import { ModalComponent } from './modal.component';
import { ModalDirective } from './modal.directive';

@NgModule({
  declarations: [ModalComponent, ModalDirective, EditComponent],
  imports: [FormModule, CommonModule, FormsModule, ReactiveFormsModule,],
  exports: [ModalComponent, ModalDirective],
  /**
   * If a component is to be transcluded inside of the ModalComponent, it must be imported here
   * and added to the list of entryComponents for the ModalModule.
   */
  entryComponents: [
    EditComponent, 
    CreateMessageFormComponent, 
    ModalComponent, 
    SelectEmployeeFormComponent,
    UserFormComponent, 
    WhiteboardIssueFormComponent,
    ReviewCloseFormComponent,
     DocumentCloseFormComponent
  ],
})
export class ModalModule { }
