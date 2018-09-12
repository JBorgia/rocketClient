import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RoutingModule } from '@app/router/routing.module';
import { FooterComponent } from '@components/navigation/footer/footer.component';
import { HeaderModule } from '@components/navigation/header/header.module';
import { ToastComponent } from '@components/toast/toast.component';
import { FormModule } from '@forms/form.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthGuard } from '@guards/auth.guard';
import { DynamicModule } from '@pages/dynamic/dynamic.module';
import { WhiteboardComponent } from '@pages/whiteboard/whiteboard.component';
import { DocumentAPI, PartAPI, ReviewAPI, UserAPI, UserLkupAPI, WhiteboardIssueAPI, SupplierLkupAPI, MissionLkupAPI } from '@services/index.ts';
import { AdminService } from '@services/admin.service';
import { AuthenticationService } from '@services/authentication.service';
import { LoginService } from '@services/login.service';
import { NavbarService } from '@services/navbar.service';
import { PaginationService } from '@services/pagination.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ToastComponent,
    WhiteboardComponent,
  ],
  imports: [
    // external imports:
    FormModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    HeaderModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    RoutingModule,
    DynamicModule,
  ],
  providers: [
    AdminService,
    AuthenticationService,
    AuthGuard,
    DocumentAPI,
    LoginService,
    NavbarService,
    PaginationService,
    PartAPI,
    ReviewAPI,
    UserAPI,
    WhiteboardIssueAPI,
    UserLkupAPI,
    SupplierLkupAPI,
    MissionLkupAPI,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
