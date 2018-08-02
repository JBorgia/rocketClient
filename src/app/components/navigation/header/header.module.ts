import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatButtonToggleModule, MatToolbarModule, MatMenuModule, MatButtonModule } from '@angular/material';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, MatIconModule, MatButtonToggleModule, MatToolbarModule, MatButtonModule, MatMenuModule, RouterModule],
    exports: [HeaderComponent],
})
export class HeaderModule { }
