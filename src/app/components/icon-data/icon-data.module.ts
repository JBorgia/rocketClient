import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconDataComponent } from './icon-data.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [IconDataComponent],
  imports: [
    CommonModule, 
    FontAwesomeModule,
  ],
  exports: [IconDataComponent],
  entryComponents: [IconDataComponent],
})
export class IconDataModule {}
