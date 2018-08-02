import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalComponent } from './modal.component';
import { ModalDirective } from './modal.directive';
import { EditComponent } from '@components/edit/edit.component';
import { UserFormComponent } from '@forms/user-form/user-form.component';
import { AppFormModule } from '@forms/app-form.module';

@NgModule({
  declarations: [ModalComponent, ModalDirective, EditComponent],
  imports: [AppFormModule, CommonModule, FormsModule, ReactiveFormsModule,],
  exports: [ModalComponent, ModalDirective],
  entryComponents: [ModalComponent, EditComponent, UserFormComponent],
})
export class ModalModule { }
