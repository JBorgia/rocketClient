import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { FlexTableComponent } from './flex-table.component';
import { FlexTableModalComponent } from './flex-table-modal/flex-table-modal.component';
import { FilterPipe, OrderPipe } from './flex-table.pipes';

@NgModule({
  declarations: [
    FlexTableComponent,
    FlexTableModalComponent,
    FilterPipe,
    OrderPipe,
  ],
  imports: [CommonModule, FormsModule, MatDialogModule],
  exports: [FlexTableComponent, FormsModule],
  entryComponents: [FlexTableComponent, FlexTableModalComponent],
})
export class FlexTableModule {}
