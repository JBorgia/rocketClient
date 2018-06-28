import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { FlexTableComponent } from './flex-table.component';
import { ModalComponent } from './flex-table-modal/modal.component';
import { FilterPipe, OrderPipe } from './flex-table.pipes';
import { ModalDirective } from './flex-table-modal/modal.directive';
import { EditUserComponent } from '@pages/admin/users/edit-user/edit-user.component';

@NgModule({
  declarations: [
    FlexTableComponent,
    ModalComponent,
    EditUserComponent,
    FilterPipe,
    OrderPipe,
    ModalDirective,
  ],
  imports: [CommonModule, FormsModule, MatDialogModule],
  exports: [FlexTableComponent, FormsModule],
  entryComponents: [FlexTableComponent, ModalComponent, EditUserComponent],
})
export class FlexTableModule {}
