import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { User } from '@models/user.model';

import { AuthenticationAPI } from '@services/api//authenticationAPI.service';


import { arsServiceBaseUrl } from '@environments/environment';

export interface UserInStorage {
    fullName: string;
    email: string;
    displayName: string;
    token: string;
    jwt: string;
    employeeId?: number;
}

export interface LoginInfoInStorage {
    success: boolean;
    message: string;
    landingPage: string;
    user?: UserInStorage;
}

@Injectable()
export class UserAPI {
    public currentUserKey: 'currentUser';
    public storage: Storage = sessionStorage; // <--- you may switch between sessionStorage or LocalStrage (only one place to change)

    constructor(
        private authenticationAPI: AuthenticationAPI,
        private http: HttpClient) { }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${arsServiceBaseUrl}arsUsers`, { headers: this.authenticationAPI.apiGetHeaders() }).pipe(
            tap(cursor => console.log(`getAllUsers returned:`, cursor)),
            catchError(this.handleError)
        );
    }

    saveUser(user: User): Observable<User> {
        return this.http.post<User>('http://localhost:8080/arsUsers', user);
    }

    // Store userinfo from session storage
    storeUserInfo(userInfoString: string) {
        this.storage.setItem(this.currentUserKey, userInfoString);
    }

    // Remove userinfo from session storage
    removeUserInfo() {
        this.storage.removeItem(this.currentUserKey);
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

    isLoggedIn(): boolean {
        return this.storage.getItem(this.currentUserKey) ? true : false;
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

    getStoredToken(): string | null {
        const userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            return userObj.token;
        }
        return null;
    }

    getJwtToken(): string | null {
        const userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            return userObj.jwt;
        }
        return null;
    }

    getEmployeeId(): number | null {
        const userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            return userObj.employeeId;
        }
        return null;
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      }
}

