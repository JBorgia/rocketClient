import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { AuthenticationService } from '@services/authentication.service';
import { UserAPI } from '@services/index';
import { LoginService } from '@services/login.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  model: any = {};
  errMsg = '';
  constructor(
    private router: Router,
    private loginService: LoginService,
    private authenticationService: AuthenticationService,
    public userAPI: UserAPI,
    public Authinacate: AuthGuard,
    private http: HttpClient,
  ) { }
  checkMyAccess = this.authenticationService.validateUserInTestTable;
  userInfo = this.authenticationService.getUserInfo();
  userInTestTableValue = '';
  userAccessChecked = false;

  ngOnInit() {
    // reset login status
    this.loginService.logout(false);
  }

  login() {
    this.loginService.getToken(this.model.username, this.model.password)
      .subscribe(resp => {
        if (!resp.user || !resp.user.token || resp.user.token === 'INVALID') {
          if (!Array.isArray(resp)) {
            this.errMsg = 'Username or password is incorrect ';
          }
          return;
        }
        this.router.navigate([resp.landingPage]);
      },
        errResponse => {
          switch (errResponse.status) {
            case 401:
              this.errMsg = 'Username or password is incorrect';
              console.log(this.errMsg);
              break;
            case 404:
              this.errMsg = 'Service not found';
              break;
            case 408:
              this.errMsg = 'Request Timedout';
              break;
            case 500:
              this.errMsg = 'Internal Server Error';
              break;
            default:
              this.errMsg = 'Login failed: Make sure Username and Password are correct and try again.';
          }
        }
      );
  }

  onSignUp() {
    this.router.navigate(['signup']);
  }
}

