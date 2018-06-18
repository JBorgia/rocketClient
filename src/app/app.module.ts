import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { RoutingModule } from '@app/router/routing.module';
import { WhiteboardAPI } from '@app/services';

import { DropdownComponent } from '@components/dropdown/dropdown.component';
import { FooterComponent } from '@components/navigation/footer/footer.component';
import { HeaderComponent } from '@components/navigation/header/header.component';
import { ToastComponent } from '@components/toast/toast.component';

import { AuthGuard } from '@guards/auth.guard';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminComponent } from '@pages/admin/admin.component';
import { DashboardModule } from '@pages/dashboard/dashboard.module';
import { LandingModule } from '@pages/landing/landing.module';
import { LoginModule } from '@pages/login/login.module';
import { MissionStatusComponent } from '@pages/reports/mission-status/mission-status.component';
import { ReportsModule } from '@pages/reports/reports.module';
import { ReviewStatusComponent } from '@pages/reports/review-status/review-status.component';
import { RidReportComponent } from '@pages/reports/rid-report/rid-report.component';
import { SupplierReviewStatusComponent } from '@pages/reports/supplier-review-status/supplier-review-status.component';
import { ReviewDetailsModule } from '@pages/review-details/review-details.module';
import { ReviewsModule } from '@pages/reviews/reviews.module';
import { TestComponent } from '@pages/test/test.component';
import { WhiteboardComponent } from '@pages/whiteboard/whiteboard.component';

import { AdminService } from '@services/admin.service';
import { AuthenticationAPI } from '@services/api/authenticationAPI.service';
import { ReviewAPI } from '@services/api/reviewAPI.service';
import { LoginService } from '@services/login.service';
import { NavbarService } from '@services/navbar.service';
import { PaginationService } from '@services/pagination.service';
import { TestService } from '@services/test.service';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { UserService } from '@app/services/user.service';

@NgModule({
  declarations: [
    AdminComponent,
    AppComponent,
    DropdownComponent,
    FooterComponent,
    HeaderComponent,
    MissionStatusComponent,
    ReviewStatusComponent,
    RidReportComponent,
    SupplierReviewStatusComponent,
    TestComponent,
    ToastComponent,
    WhiteboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgbModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
    RoutingModule,
    LoginModule,
    LandingModule,
    DashboardModule,
    ReportsModule,
    ReviewDetailsModule,
    ReviewsModule,
  ],
  providers: [
    AdminService,
    AuthenticationAPI,
    AuthGuard,
    LoginService,
    NavbarService,
    PaginationService,
    WhiteboardAPI,
    ReviewAPI,
    TestService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
