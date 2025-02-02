import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatButtonToggleModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { DetailHostDirective } from './detail-host.directive';
import { DynamicHostDirective } from './dynamic-host.directive';
import { IconDataModule } from '@components/icon-data/icon-data.module';
import { SearchResultsModule } from '@components/search-results/search-results.module';
import { VirtualScrollModule } from '@components/virtual-scroll/virtual-scroll.module';
import { KeyValueModule } from '@pipes/keyvalue.pipe';
import { DynamicService } from './dynamic.service';
import { VsDisplayModule, VsDisplayComponent } from './vs-display/vs-display.module';

import { DetailItemComponent } from './detail-item/detail-item.component';
import { DynamicComponent } from './dynamic.component';
import {
  AdminToolsComponent,
  DocumentDetailComponent,
  DashboardNotificationsComponent,
  PartDetailComponent,
} from './_index';
import { ToolItemComponent } from './admin-tools/tool-item/tool-item.component';
import { MatTooltipModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const ROUTES = [
  { path: ':dynamic-type', component: DynamicComponent },
  { path: ':dynamic-type/:id', component: DynamicComponent },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: '/', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    KeyValueModule,
    IconDataModule,
    SearchResultsModule,
    VsDisplayModule,
    VirtualScrollModule,
    FontAwesomeModule,
    MatTooltipModule, MatIconModule, MatButtonToggleModule, MatToolbarModule, MatButtonModule, MatMenuModule, RouterModule

  ],
  exports: [
    DynamicComponent,
    DetailHostDirective,
    DynamicHostDirective,
  ],
  providers: [
    DynamicService
  ],
  declarations: [
    AdminToolsComponent,
    DashboardNotificationsComponent,
    DetailHostDirective,
    DetailItemComponent,
    DocumentDetailComponent,
    DynamicComponent,
    DynamicHostDirective,
    PartDetailComponent,
    ToolItemComponent,
  ],
  /**
   * If a new dynamic component is to be added to the list for transclusion inside the pages handled by the DynamicComponent,
   * it must be imported here and added to the list of entryComponents for the DynamicModule.
   */
  entryComponents: [
    AdminToolsComponent,
    DashboardNotificationsComponent,
    DocumentDetailComponent,
    PartDetailComponent,
  ],
})
export class DynamicModule { }
