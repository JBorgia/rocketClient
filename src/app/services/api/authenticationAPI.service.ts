import { of, throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserService } from '@services/user.service';
import { authBaseUrl, arsServiceBaseUrl } from '@environments/environment';

@Injectable()
export class AuthenticationAPI {
  userInTestTableValue = null;
  userAccessChecked = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  private _authBaseUrl = authBaseUrl;
  private authEndpoint = '/authentication_service/user';

  private _arsServiceBaseUrl = arsServiceBaseUrl;
  // private _arsServiceBaseUrl = 'http://localhost:8585/ars_service';
  private arsValidateUserInTestTableEndpoint =
    '/test_users/validateUserInTestTable';
  private arsValidateUserInTestTableWithAuthEndpoint =
    '/test_users/validateUserInTestTableWithAuth';

  authGetHeaders(cr?: any): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.userService.getStoredToken();
    headers = headers.append('Content-Type', 'application/json');
    const credentials = 'Basic ' + btoa(`${cr.username}:${cr.password}`);
    headers = headers.append('Authorization', credentials);
    return headers;
  }

  apiGetHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    const token = this.userService.getJwtToken();
    const authJwt = 'JWT ' + token;
    // headers = headers.append('Authorization', authJwt);
    headers.set('Authorization', 'Bearer ' + authJwt);
    return headers;
  }

  validateUserInTestTable(): Observable<any> {
    if (this.userInTestTableValue) {
      return this.userInTestTableValue;
    } else if (this.userService.getUserInfo()) {
      const paramsObj = { email: this.userService.getUserInfo().email };
      return this.http
        .get(this._arsServiceBaseUrl + this.arsValidateUserInTestTableEndpoint, {
          headers: null,
          params: paramsObj,
        })
        .pipe(
          catchError(error => {
            console.log('Some error in catch');
            // if (error.status === 401 || error.status === 403) {
            //     me.router.navigate(['/home']);
            // }
            return observableThrowError(error || 'Server error');
          })
        );
    }
  }

  validateUserInTestTableWithAuth(urlParams: HttpParams): Observable<any> {
    return this.http
      .post(
        this._arsServiceBaseUrl +
          this.arsValidateUserInTestTableWithAuthEndpoint,
        {
          params: urlParams,
          withCredentials: true,
          headers: this.apiGetHeaders(),
        }
      )
      .pipe(
        catchError(error => {
          console.log('Some error in catch');
          // if (error.status === 401 || error.status === 403) {
          //     me.router.navigate(['/home']);
          // }
          return observableThrowError(error || 'Server error');
        })
      );
  }

  authGets(url: string, urlParams: HttpParams, data?: any): Observable<any> {
    const me = this;
    return this.http
      .get(this._authBaseUrl + this.authEndpoint, {
        headers: this.authGetHeaders(data),
        params: urlParams,
      })
      .pipe(
        catchError(error => {
          console.log('Some error in catch');
          if (error.status === 401 || error.status === 403) {
            me.router.navigate(['/logout']);
          }
          return observableThrowError(error || 'Server error');
        })
      );
  }
}
