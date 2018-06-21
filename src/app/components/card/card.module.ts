import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexTableModule } from '@components/flex-table/flex-table.module';

import { CardComponent } from './card.component';
import { PlusMinusComponent } from '@components/plus-minus/plus-minus.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexTableModule,
    ],
    exports: [
        PlusMinusComponent,
        CardComponent,
    ],
    declarations: [
        PlusMinusComponent,
        CardComponent,
    ],
})
export class CardModule { }
