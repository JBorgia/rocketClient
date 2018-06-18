import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ReportsComponent } from './reports.component';

const ROUTES = [{ path: '', component: ReportsComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ReportsComponent],
  declarations: [
    ReportsComponent,
  ],
})
export class ReportsModule { }
