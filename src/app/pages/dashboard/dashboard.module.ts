import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexTableModule } from '@components/flex-table/flex-table.module';
import { CardComponent } from '@components/card//card.component';

import { DashboardComponent } from './dashboard.component';

const ROUTES = [{ path: '', component: DashboardComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        FormsModule,
        ReactiveFormsModule,
        FlexTableModule,
    ],
    exports: [
        DashboardComponent,
        CardComponent,
    ],
    declarations: [
        DashboardComponent,
        CardComponent,
    ],
})
export class DashboardModule { }
