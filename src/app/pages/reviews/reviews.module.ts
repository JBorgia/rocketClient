import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderrByPipeModule } from '@pipes/order-by.pipe';
import { SearchPipeModule } from '@pipes/category.pipe';

import { ReviewsComponent } from './reviews.component';

import { CardModule } from '@components/card/card.module';
import { FlexTableModule } from '@components/flex-table/flex-table.module';

const ROUTES = [
  { path: '', component: ReviewsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    OrderrByPipeModule,
    SearchPipeModule,
    FlexTableModule,
    CardModule,
  ],
  exports: [
    ReviewsComponent,
  ],
  declarations: [
    ReviewsComponent,
  ],
})
export class ReviewsModule { }
