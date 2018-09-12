import { throwError as observableThrowError, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { authBaseUrl, arsServiceBaseUrl } from '@environments/environment';
import { ArsUser } from '@models/ars-app.models';

export interface LoginInfoInStorage {
  success: boolean;
  message: string;
  landingPage: string;
  user?: UserInStorage;
}

export interface UserInStorage {
  fullName: string;
  email: string;
  displayName: string;
  token: string;
  jwt: string;
  employeeId?: number;
}

@Injectable()
export class AuthenticationService {
  userInTestTableValue = null;
  userAccessChecked = false;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  private _currentUserArsData: ArsUser;
  public currentUserKey: 'currentUser';
  public storage: Storage = sessionStorage; // <--- you may switch between sessionStorage or LocalStrage (only one place to change)
  
  private _authBaseUrl = authBaseUrl;
  private authEndpoint = '/authentication_service/user';

  private _arsServiceBaseUrl = arsServiceBaseUrl;
  private arsValidateUserInTestTableEndpoint = '/test_users/validateUserInTestTable';
  private arsValidateUserInTestTableWithAuthEndpoint = '/test_users/validateUserInTestTableWithAuth';

  /**
   * Here, the currentUserArsData is set using a user fetched from the ArsUser table via their login (employee) id. This information may
   * be getting pulled from the browser storage. In the case that the currentUserArsData is attempted to be stored as null or undefined
   * the user should be directed to relogin.
   */
  set currentUserArsData(user){
    if(user){
      this._currentUserArsData = user;
    } else{
      this.router.navigate(['/']);
    }
  }

  get currentUserArsData(){
    return this._currentUserArsData;
    // if(this._currentUserArsData){
    //   return this._currentUserArsData;
    // } else{
    //   this.router.navigate(['/']);
    // }
  }

  authGetHeaders(cr?: any): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.getStoredToken();
    headers = headers.append('Content-Type', 'application/json');
    const credentials = 'Basic ' + btoa(`${cr.username}:${cr.password}`);
    headers = headers.append('Authorization', credentials);
    return headers;
  }

  apiGetHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    const token = this.getJwtToken();
    const authJwt = 'JWT ' + token;
    // headers = headers.append('Authorization', authJwt);
    headers.set('Authorization', 'Bearer ' + authJwt);
    return headers;
  }

  validateUserInTestTable(): Observable<any> {
    if (this.userInTestTableValue) {
      return this.userInTestTableValue;
    } else if (this.getUserInfo()) {
      const paramsObj = { email: this.getUserInfo().email };
      return this.http
        .get(this._arsServiceBaseUrl + this.arsValidateUserInTestTableEndpoint, {
          headers: null,
          params: paramsObj,
        })
        .pipe(
          catchError(error => {
            console.log('validateUserInTestTable: Some error in catch');
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
          console.log('validateUserInTestTableWithAuth: Some error in catch');
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
          console.log('authGets: Some error in catch');
          if (error.status === 401 || error.status === 403) {
            me.router.navigate(['/logout']);
          }
          return observableThrowError(error || 'Server error');
        })
      );
  }

  getJwtToken(): string | null {
      const userObj: UserInStorage = this.getUserInfo();
      if (userObj !== null) {
          return userObj.jwt;
      }
      return null;
  }

  // Get userinfo from session storage
  getUserInfo(): UserInStorage | null {
      try {
          const userInfoString: string = this.storage.getItem(this.currentUserKey);
          if (userInfoString) {
              const userObj: UserInStorage = JSON.parse(this.storage.getItem(this.currentUserKey));
              return userObj;
          } else {
              return null;
          }
      } catch (e) {
          return null;
      }
  }

  getStoredToken(): string | null {
      const userObj: UserInStorage = this.getUserInfo();
      if (userObj !== null) {
          return userObj.token;
      }
      return null;
  }

  // Get User's Display name from session storage
  getUserName(): string {
      const userObj: UserInStorage = this.getUserInfo();
      if (userObj !== null) {
          // console.log(userObj.fullName);
          return userObj.fullName;
      }
      return 'no-user';
  }

  // Get User's Display name from session storage
  getUserEmail(): string {
      const userObj: UserInStorage = this.getUserInfo();
      if (userObj !== null) {
          return userObj.email;
      }
      // console.log(userObj.email);
      return 'no-user';
  }

  getEmployeeId(): number | null {
      const userObj: UserInStorage = this.getUserInfo();
      if (userObj !== null) {
          return userObj.employeeId;
      }
      return null;
  }

  isLoggedIn(): Observable<boolean> {
      return of(this.storage.getItem(this.currentUserKey) ? true : false);
  }

  // Remove userinfo from session storage
  removeUserInfo() {
      this.storage.removeItem(this.currentUserKey);
      this.currentUserArsData = null;
  }

  // Store userinfo from session storage
  storeUserInfo(userInfoString: string) {
      this.storage.setItem(this.currentUserKey, userInfoString);
  }

}
