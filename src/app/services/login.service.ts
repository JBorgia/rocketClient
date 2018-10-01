import {
  throwError as observableThrowError,
  Observable,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { LoginInfoInStorage, AuthenticationService } from '@services/authentication.service';
import { UserAPI } from '@services/api/userAPI.service';

export interface LoginRequestParam {
  username: string;
  password: string;
}

@Injectable()
export class LoginService {
  public landingPage = '/dynamic/dashboard';
  currentUserArsData;
  constructor(
    private router: Router,
    private userAPI: UserAPI,
    private authenticationService: AuthenticationService,
  ) { }

  getToken(username: string, password: string): Observable<any> {
    const bodyData: LoginRequestParam = {
      username: username,
      password: password,
    };

    let loginInfoReturn: LoginInfoInStorage;

    return this.authenticationService.authGets('', null, bodyData).pipe(
      map(jsonResp => {
        if (jsonResp) {
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
          this.authenticationService.storeUserInfo(JSON.stringify(loginInfoReturn.user));

        } else {
          // Create a faliure object that we want to send back to login page
          loginInfoReturn = {
            success: false,
            message: jsonResp.msgDesc,
            landingPage: '/', //  we shouldn't send users here on fail.
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
            landingPage: '/',
          };
          return observableThrowError(err);
        }
      )
    );
    // return loginDataSubject;
  }

  logout(navigatetoLogout = true): void {
    // clear token remove user from local storage to log user out
    this.authenticationService.removeUserInfo();
    if (navigatetoLogout) {
      this.router.navigate(['/']);
    }
  }
}
