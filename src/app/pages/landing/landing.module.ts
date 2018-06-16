import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LandingComponent } from './landing.component';

const ROUTES = [{ path: 'landing', component: LandingComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [LandingComponent],
  declarations: [LandingComponent],
})
export class LandingModule {}
