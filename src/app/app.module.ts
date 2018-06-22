import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { RoutingModule } from '@app/router/routing.module';
import { WhiteboardAPI } from '@app/services';
import { UserService } from '@app/services/user.service';

import { DropdownComponent } from '@components/dropdown/dropdown.component';
import { FooterComponent } from '@components/navigation/footer/footer.component';
import { HeaderComponent } from '@components/navigation/header/header.component';
import { ToastComponent } from '@components/toast/toast.component';

import { AuthGuard } from '@guards/auth.guard';


import { AdminService } from '@services/admin.service';
import { AuthenticationAPI } from '@services/api/authenticationAPI.service';
import { ReviewAPI } from '@services/api/reviewAPI.service';
import { UserAPI } from '@services/api/userAPI.service';
import { LoginService } from '@services/login.service';
import { NavbarService } from '@services/navbar.service';
import { PaginationService } from '@services/pagination.service';

import { WhiteboardComponent } from '@pages/whiteboard/whiteboard.component';

// decouple and remove ngx-bootstrap
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

// import { VirtualScrollModule } from '@components/odvs/virtualScroll.module';

@NgModule({
  declarations: [
    AppComponent,
    DropdownComponent,
    FooterComponent,
    HeaderComponent,
    // RidReportComponent,
    // SupplierReviewStatusComponent,
    ToastComponent,
    WhiteboardComponent,
  ],
  imports: [
    // external imports:
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgbModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
    RoutingModule,
    // VirtualScrollModule,
  ],
  providers: [
    AdminService,
    AuthenticationAPI,
    AuthGuard,
    LoginService,
    NavbarService,
    PaginationService,
    ReviewAPI,
    UserAPI,
    UserService,
    WhiteboardAPI,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
