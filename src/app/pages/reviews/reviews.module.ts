import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderrByPipeModule } from '@pipes/orderBy.pipe';
import { SearchPipeModule } from '@pipes/category.pipe';

import { ReviewsComponent } from './reviews.component';

const ROUTES = [{ path: '', component: ReviewsComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    OrderrByPipeModule,
    SearchPipeModule,
  ],
  exports: [
    ReviewsComponent
  ],
  declarations: [
    ReviewsComponent,
  ],
})
export class ReviewsModule { }
