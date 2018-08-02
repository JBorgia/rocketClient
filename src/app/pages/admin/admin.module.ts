import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatButtonToggleModule, MatToolbarModule, MatMenuModule, MatButtonModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';

import { FlexTableModule } from '@components/flex-table/flex-table.module';
import { CardModule } from '@components/card/card.module';

import { AdminComponent } from './admin.component';
import { PartDetailComponent } from './part-detail/part-detail.component';
import { UsersComponent } from './users/users.component';
import { DetailItemComponent } from './part-detail/detail-item/detail-item.component';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
import { KeyValueModule } from '@pipes/keyvalue.pipe';
import { IconDataModule } from '@components/icon-data/icon-data.module';

const ROUTES = [
  { path: '', component: AdminComponent },
  { path: '/', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    FlexTableModule,
    MatExpansionModule,
    KeyValueModule,
    IconDataModule,
    CardModule, MatIconModule, MatButtonToggleModule, MatToolbarModule, MatButtonModule, MatMenuModule, RouterModule

  ],
  exports: [AdminComponent],
  declarations: [AdminComponent, PartDetailComponent, UsersComponent, DetailItemComponent, WhiteboardComponent],
})
export class AdminModule { }
