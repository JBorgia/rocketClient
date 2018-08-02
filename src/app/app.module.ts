import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RoutingModule } from '@app/router/routing.module';
import { WhiteboardAPI } from '@app/services';
import { DropdownComponent } from '@components/dropdown/dropdown.component';
import { FooterComponent } from '@components/navigation/footer/footer.component';
import { HeaderModule } from '@components/navigation/header/header.module';
import { ToastComponent } from '@components/toast/toast.component';
import { AuthGuard } from '@guards/auth.guard';
import { WhiteboardComponent } from '@pages/whiteboard/whiteboard.component';
import { AdminService } from '@services/admin.service';
import { AppFormModule } from '@forms/app-form.module';
import {
  AuthenticationAPI,
  DocumentAPI,
  PartAPI,
  ReviewAPI,
  UserAPI,
  UserPartAPI
  } from '@services/index';
import { LoginService } from '@services/login.service';
import { NavbarService } from '@services/navbar.service';
import { PaginationService } from '@services/pagination.service';
import { UserService } from '@services/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// import { VirtualScrollModule } from '@components/odvs/virtualScroll.module';

@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
    FooterComponent,
    // RidReportComponent,
    // SupplierReviewStatusComponent,
    ToastComponent,
    WhiteboardComponent,
  ],
  imports: [
    // external imports:
    HeaderModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    RoutingModule,
    AppFormModule,
    FontAwesomeModule,
    // VirtualScrollModule,
  ],
  providers: [
    AdminService,
    AuthenticationAPI,
    AuthGuard,
    DocumentAPI,
    LoginService,
    NavbarService,
    PaginationService,
    PartAPI,
    ReviewAPI,
    UserAPI,
    UserPartAPI,
    UserService,
    WhiteboardAPI,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
