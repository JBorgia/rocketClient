import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexTableModule } from '@components/flex-table/flex-table.module';
import { CardModule } from '@components/card/card.module';

import { PartReviewComponent } from './part-review.component';

const ROUTES = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: ':id', component: PartReviewComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    FlexTableModule,
    CardModule,
  ],
  exports: [PartReviewComponent],
  declarations: [PartReviewComponent],
})
export class PartReviewModule {}
