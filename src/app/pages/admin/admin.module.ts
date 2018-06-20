import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderrByPipeModule } from '@pipes/orderBy.pipe';

import { AdminComponent } from './admin.component';

const ROUTES = [{ path: '', component: AdminComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    OrderrByPipeModule,
  ],
  exports: [
    AdminComponent
  ],
  declarations: [
    AdminComponent,
  ],
})
export class AdminModule { }
