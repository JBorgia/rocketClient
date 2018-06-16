import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';

import { DropdownComponent } from '@components/dropdown/dropdown.component';
import { DataTableModule } from '@components/flex-table/flex-table.module';
import { FooterComponent } from '@components/navigation/footer/footer.component';
import { HeaderComponent } from '@components/navigation/header/header.component';
import { ToastComponent } from '@components/toast/toast.component';

import { AdminComponent } from '@pages/admin/admin.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { LandingComponent } from '@pages/landing/landing.component';
import { LoginModule } from '@pages/login/login.module';
import { MissionStatusComponent } from '@pages/reports/mission-status/mission-status.component';
import { ReportsComponent } from '@pages/reports/reports.component';
import { ReviewStatusComponent } from '@pages/reports/review-status/review-status.component';
import { RidReportComponent } from '@pages/reports/rid-report/rid-report.component';
import { SupplierReviewStatusComponent } from '@pages/reports/supplier-review-status/supplier-review-status.component';
import { ReviewDetailsComponent } from '@pages/review-details/review-details.component';
import { UserSupportComponent } from '@pages/review-details/user-support/user-support.component';
import { UsersComponent } from '@pages/review-details/users/users.component';
import { ReviewsComponent } from '@pages/reviews/reviews.component';
import { TestComponent } from '@pages/test/test.component';
import { WhiteboardComponent } from '@pages/whiteboard/whiteboard.component';

import { SearchPipe } from '@pipes/category.pipe';
import { OrderrByPipe } from '@pipes/orderBy.pipe';

import { RoutingModule } from './routing.module';

import { AdminService } from '@services/admin.service';
import { AuthenticationAPI } from '@services/api/authenticationAPI.service';
import { ReviewAPI } from '@services/api/reviewAPI.service';
import { AuthGuard } from '@services/auth_guard.service';
import { LoginService } from '@services/login.service';
import { NavbarService } from '@services/navbar.service';
import { PaginationService } from '@services/pagination.service';
import { TestService } from '@services/test.service';
import { UserService } from './services/user.service';
import { WhiteboardAPI } from '@app/services';

@NgModule({
  declarations: [
    AdminComponent,
    AppComponent,
    DashboardComponent,
    DropdownComponent,
    FooterComponent,
    HeaderComponent,
    LandingComponent,
    MissionStatusComponent,
    OrderrByPipe,
    ReportsComponent,
    ReviewDetailsComponent,
    ReviewsComponent,
    ReviewStatusComponent,
    RidReportComponent,
    SearchPipe,
    SupplierReviewStatusComponent,
    TestComponent,
    ToastComponent,
    UsersComponent,
    UserSupportComponent,
    WhiteboardComponent,
  ],
  imports: [
    BrowserModule,
    DataTableModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgbModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
    RoutingModule,
    LoginModule,
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
