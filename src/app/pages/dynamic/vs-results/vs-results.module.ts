import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VsResultsComponent } from './vs-results.component';
import { CardModule } from '@app/components/card/card.module';
import { IconDataModule } from '@components/icon-data/icon-data.module';
import { VirtualScrollModule } from '@components/virtual-scroll/virtual-scroll.module';
import { PartItemComponent } from './part-item/part-item.component';
import { VsResultsHostDirective } from './vs-results-host.directive';
import { VsResultsService } from './vs-results.service';

export * from './vs-results.component';

@NgModule({
  imports: [
    CommonModule,
    VirtualScrollModule,
    CardModule,
    IconDataModule,
  ],
  providers: [
    VsResultsService
  ],
  declarations: [
    PartItemComponent,
    VsResultsComponent,
    VsResultsHostDirective,
  ],
  exports: [
    PartItemComponent,
    VsResultsComponent,
  ],
  entryComponents: [
    VsResultsComponent,
    PartItemComponent
  ],
})
export class VsResultsModule { }
