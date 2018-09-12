import {NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { VirtualScrollComponent} from './virtual-scroll.component';

@NgModule({
	exports: [VirtualScrollComponent],
	declarations: [VirtualScrollComponent],
	imports: [CommonModule]

})
export class VirtualScrollModule { }