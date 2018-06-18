import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlexTableComponent } from './flex-table.component';
import { FilterPipe, OrderPipe } from './flex-table.pipes';

@NgModule({
  declarations: [
    FlexTableComponent,
    FilterPipe,
    OrderPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FlexTableComponent,
    FormsModule
  ]
})
export class FlexTableModule { }
