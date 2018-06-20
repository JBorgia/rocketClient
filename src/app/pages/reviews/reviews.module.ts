import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderrByPipeModule } from '@pipes/orderBy.pipe';
import { SearchPipeModule } from '@pipes/category.pipe';

import { ReviewsComponent } from './reviews.component';
import { ReviewDetailsComponent } from './review-details/review-details.component';
import { UsersComponent } from '@app/pages/reviews/review-details/users/users.component';
import { UserSupportComponent } from '@app/pages/reviews/review-details/user-support/user-support.component';

import { FlexTableModule } from '@components/flex-table/flex-table.module';

const ROUTES = [
  { path: '', component: ReviewsComponent },
  { path: 'review-details', component: ReviewDetailsComponent },
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
  ],
  exports: [
    ReviewsComponent,
    ReviewDetailsComponent,
    UsersComponent,
    UserSupportComponent,
  ],
  declarations: [
    ReviewsComponent,
    ReviewDetailsComponent,
    UsersComponent,
    UserSupportComponent,
  ],
})
export class ReviewsModule { }
