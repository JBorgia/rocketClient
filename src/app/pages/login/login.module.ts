import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CardModule } from '@components/card/card.module';
import { MatButtonModule } from '@angular/material';

import { LoginComponent } from './login.component';

const ROUTES = [{ path: '', component: LoginComponent }];

@NgModule({
  imports: [
    CardModule,
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports: [LoginComponent],
  declarations: [LoginComponent],
})
export class LoginModule { }
