import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CreateMessageFormComponent,
  SelectEmployeeFormComponent,
  CreateUserFormComponent,
  AddUserFormComponent,
  CreateWhiteboardIssueFormComponent,
  CloseWhiteboardIssueFormComponent,
  CloseReviewFormComponent,
  CreateWhiteboardNoteFormComponent,
 } from '@app/forms';
import { EditComponent } from '@components/edit/edit.component';
import { FormModule } from '@forms/form.module';

import { ModalComponent } from './modal.component';
import { ModalDirective } from './modal.directive';
import { WhiteboardNotesComponent } from '@app/pages/dynamic/vs-display/display-items/_index';

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
    CreateWhiteboardNoteFormComponent,
    ModalComponent, 
    SelectEmployeeFormComponent,
    AddUserFormComponent,
    CreateUserFormComponent, 
    CreateWhiteboardIssueFormComponent,
    CloseWhiteboardIssueFormComponent,
    CloseReviewFormComponent,
    WhiteboardNotesComponent,
  ],
})
export class ModalModule { }
