import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { SearchResultsComponent } from './search-results.component';
// import { FilterPipe } from './search-results.pipes';
import { OrderObjectByPipeModule } from '@pipes/order-object-by.pipe';
import { ModalModule } from '@components/modal/modal.module';
import { PartItemComponent } from './display-items/part-item/part-item.component';

@NgModule({
  declarations: [SearchResultsComponent, PartItemComponent, PartItemComponent],
  imports: [OrderObjectByPipeModule, CommonModule, FormsModule, MatDialogModule, ModalModule],
  exports: [SearchResultsComponent, FormsModule],
  entryComponents: [SearchResultsComponent, PartItemComponent],
})
export class SearchResultsModule {}
