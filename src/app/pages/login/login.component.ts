import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '@services/login.service';
import { AuthenticationAPI } from '@services/api/authenticationAPI.service';

import { AuthGuard } from '@services/auth_guard.service';
import { UserService } from '@services/user.service';

import { HttpClient, HttpParams } from '@angular/common/http';

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
    private authenticationAPI: AuthenticationAPI,
    public auth: UserService,
    public Authinacate: AuthGuard,
    private http: HttpClient,
  ) { }

  userInfo = this.auth.getUserInfo();

  userInTestTableValue = '';
  userAccessChecked = false;


  ngOnInit() {
    // reset login status
    this.loginService.logout(false);
  }

  login() {
    this.loginService.getToken(this.model.username, this.model.password)
      .subscribe(resp => {
        console.log('call this shit', this.userInTestTableValue);
        if (resp.user === undefined || resp.user.token === undefined || resp.user.token === 'INVALID') {
          if (!Array.isArray(resp)) {
            this.errMsg = 'Username or password is incorrect ';
          }
          return;
        }
        this.checkMyAccess();
        // if (this.userInTestTableValue === 'true') {
          // this.router.navigate([resp.landingPage]);

        // } else {
        //   this.router.navigateByUrl('landing');
        // }
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


  checkMyAccess() {
    const me = this;
    this.userInfo = this.auth.getUserInfo();

    let params = new HttpParams();
    params = params.append('email', this.userInfo.email);

    this.authenticationAPI.validateUserInTestTable(params, null)
      .subscribe(
      data => {
        this.userInTestTableValue = data;
        console.log(data);
        this.userAccessChecked = true;
        if (data === true) {
          this.router.navigateByUrl('reviews');
        } else {
          this.router.navigateByUrl('landing');
        }

      },
      err => console.error(err),
      () => console.log('Finished checking access.')
      );
  }


}

