import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ReportsComponent } from './reports.component';
import { MissionStatusComponent } from './mission-status/mission-status.component';
import { ReviewStatusComponent } from './review-status/review-status.component';

const ROUTES = [
  { path: '', component: ReportsComponent },
  { path: 'mission-status', component: MissionStatusComponent },
  { path: 'review-status', component: ReviewStatusComponent },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ReportsComponent,
    MissionStatusComponent,
    ReviewStatusComponent
  ],
  declarations: [
    ReportsComponent,
    MissionStatusComponent,
    ReviewStatusComponent
  ],
})
export class ReportsModule { }
