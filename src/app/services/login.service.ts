import {
  throwError as observableThrowError,
  Observable,
  BehaviorSubject,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { LoginInfoInStorage } from '@services/api/userAPI.service';
import { UserService } from '@services/user.service';
import { AuthenticationAPI } from '@services/api/authenticationAPI.service';

export interface LoginRequestParam {
  username: string;
  password: string;
}

@Injectable()
export class LoginService {
  public landingPage = '/dashboard';
  constructor(
    private router: Router,
    private userInfoService: UserService,
    private authenticationAPI: AuthenticationAPI
  ) {}

  getToken(username: string, password: string): Observable<any> {
    const me = this;

    const bodyData: LoginRequestParam = {
      username: username,
      password: password,
    };

    const loginDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    let loginInfoReturn: LoginInfoInStorage;

    return this.authenticationAPI.authGets('', null, bodyData).pipe(
      map(
        jsonResp => {
          console.log(jsonResp);
          if (jsonResp !== undefined && jsonResp !== null) {
            // Create a success object that we want to send back to login page
            loginInfoReturn = {
              success: true,
              message: jsonResp.operationMessage,
              landingPage: this.landingPage,
              user: {
                fullName: jsonResp.principal.fullName,
                email: jsonResp.principal.email,
                displayName: jsonResp.name,
                token: jsonResp.details.sessionId,
                jwt: jsonResp.principal.jwt,
                employeeId: jsonResp.principal.employeeId,
              },
            };
            // store username and jwt token in session storage to keep user logged in between page refreshes
            this.userInfoService.storeUserInfo(
              JSON.stringify(loginInfoReturn.user)
            );
          } else {
            // Create a faliure object that we want to send back to login page
            loginInfoReturn = {
              success: false,
              message: jsonResp.msgDesc,
              landingPage: '/login',
            };
          }
          // loginDataSubject.next(loginInfoReturn);
          // return loginDataSubject;
          // return Observable.of(loginInfoReturn);
          return loginInfoReturn;
        },
        err => {
          console.log(err);
          loginInfoReturn = {
            success: false,
            message:
              err.url + ' >>> ' + err.statusText + '[' + err.status + ']',
            landingPage: '/dashboard',
          };
          return observableThrowError(err);
        }
      )
    );
    // return loginDataSubject;
  }

  logout(navigatetoLogout = true): void {
    // clear token remove user from local storage to log user out
    this.userInfoService.removeUserInfo();
    if (navigatetoLogout) {
      this.router.navigate(['/']);
    }
  }
}
