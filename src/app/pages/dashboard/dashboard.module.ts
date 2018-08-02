import { CardModule } from '@components/card/card.module';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FlexTableModule } from '@components/flex-table/flex-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardDirective } from '@app/pages/dashboard/dashboard.directive';

const ROUTES = [{ path: '', component: DashboardComponent }];

@NgModule({
    imports: [
        CardModule,
        CommonModule,
        FlexTableModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
    ],
    exports: [
        DashboardComponent,
        DashboardDirective,
    ],
    declarations: [
        DashboardComponent,
        DashboardDirective,
    ],
})
export class DashboardModule { }
