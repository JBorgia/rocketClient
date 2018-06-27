import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { FlexTableComponent } from './flex-table.component';
import { FlexTableModalComponent } from './flex-table-modal/flex-table-modal.component';
import { FilterPipe, OrderPipe } from './flex-table.pipes';
import { ModalDirective } from './flex-table-modal/modal.directive';
import { EditUserComponent } from '@pages/admin/users/edit-user/edit-user.component';

@NgModule({
  declarations: [
    FlexTableComponent,
    FlexTableModalComponent,
    EditUserComponent,
    FilterPipe,
    OrderPipe,
    ModalDirective,
  ],
  imports: [CommonModule, FormsModule, MatDialogModule],
  exports: [FlexTableComponent, FormsModule],
  entryComponents: [FlexTableComponent, FlexTableModalComponent, EditUserComponent],
})
export class FlexTableModule {}
