import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalComponent } from './modal.component';
import { ModalDirective } from './modal.directive';
import { EditUserComponent } from '@pages/admin/users/edit-user/edit-user.component';

@NgModule({
  declarations: [ModalComponent, ModalDirective, EditUserComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ModalComponent, ModalDirective],
  entryComponents: [ModalComponent, EditUserComponent],
})
export class ModalModule {}
