import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatButtonToggleModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { DetailHostDirective } from './detail-host.directive';
import { DynamicHostDirective } from './dynamic-host.directive';
import { CardModule } from '@components/card/card.module';
import { FlexTableModule } from '@components/flex-table/flex-table.module';
import { IconDataModule } from '@components/icon-data/icon-data.module';
import { SearchResultsModule } from '@components/search-results/search-results.module';
import { VirtualScrollModule } from '@components/virtual-scroll/virtual-scroll.module';
import { KeyValueModule } from '@pipes/keyvalue.pipe';
import { DynamicService } from './dynamic.service';
import { VsResultsModule, VsResultsComponent } from './vs-results/vs-results.module';

import { DetailItemComponent } from './detail-item/detail-item.component';
import { DynamicComponent } from './dynamic.component';
import {
  DocumentDetailComponent,
  DocumentsComponent,
  PartDetailComponent,
  PartsComponent,
  ReviewsComponent,
  TeamComponent,
  UsersComponent,
  WhiteboardComponent,
} from './_index';
import {
  SearchPartsFormComponent
} from '@forms/index';

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
    FlexTableModule,
    MatExpansionModule,
    KeyValueModule,
    IconDataModule,
    SearchResultsModule,
    VsResultsModule,
    VirtualScrollModule,
    CardModule, MatIconModule, MatButtonToggleModule, MatToolbarModule, MatButtonModule, MatMenuModule, RouterModule

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
    DetailHostDirective,
    DetailItemComponent,
    DocumentDetailComponent,
    DocumentsComponent,
    DynamicComponent,
    DynamicHostDirective,
    PartDetailComponent,
    PartsComponent,
    ReviewsComponent,
    TeamComponent,
    UsersComponent,
    WhiteboardComponent,
  ],
  /**
   * If a new dynamic component is to be added to the list for transclusion inside the pages handled by the DynamicComponent,
   * it must be imported here and added to the list of entryComponents for the DynamicModule.
   */
  entryComponents: [
    DocumentDetailComponent,
    DocumentsComponent,
    PartDetailComponent,
    PartsComponent,
    ReviewsComponent,
    TeamComponent,
    UsersComponent,
    WhiteboardComponent,
    SearchPartsFormComponent,
  ],
})
export class DynamicModule { }
