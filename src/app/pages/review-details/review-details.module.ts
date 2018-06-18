import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderrByPipeModule } from '@pipes/orderBy.pipe';

import { ReviewDetailsComponent } from './review-details.component';
import { UsersComponent } from './users/users.component';
import { UserSupportComponent } from './user-support/user-support.component';

const ROUTES = [{ path: '', component: ReviewDetailsComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    OrderrByPipeModule,
  ],
  exports: [
    ReviewDetailsComponent
  ],
  declarations: [
    ReviewDetailsComponent,
    UsersComponent,
    UserSupportComponent,
  ],
})
export class ReviewDetailsModule { }
