import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CardModule } from '@components/card/card.module';
import { FlexTableModule } from '@components/flex-table/flex-table.module';

import { OrderrByPipeModule } from '@pipes/orderBy.pipe';

import { AdminComponent } from './admin.component';

import { UsersComponent } from './users/users.component';

const ROUTES = [{ path: '', component: AdminComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    FlexTableModule,
    ReactiveFormsModule,
    OrderrByPipeModule,
    CardModule,
  ],
  exports: [
    AdminComponent
  ],
  declarations: [
    AdminComponent,
    UsersComponent,
  ],
})
export class AdminModule { }
