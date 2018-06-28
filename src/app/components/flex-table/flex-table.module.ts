import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { FlexTableComponent } from './flex-table.component';
import { FilterPipe, OrderPipe } from './flex-table.pipes';
import { ModalModule } from '@components/modal/modal.module';

@NgModule({
  declarations: [FlexTableComponent, FilterPipe, OrderPipe],
  imports: [CommonModule, FormsModule, MatDialogModule, ModalModule],
  exports: [FlexTableComponent, FormsModule],
  entryComponents: [FlexTableComponent],
})
export class FlexTableModule {}
