
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserService, LoginInfoInStorage } from '@services/user.service';

@Injectable()
export class AuthenticationAPI {

    constructor(
        private http: HttpClient,
        private router: Router,
        private userInfoService: UserService
    ) { }

    private authBaseUrl = 'http://seadta.dnvr.ulalaunch.com:9999';
    // private authBaseUrl = 'http://localhost:9999';
    private authEndpoint = '/authentication_service/user';

    private arsServiceBaseUrl = 'http://seadta.dnvr.ulalaunch.com:8585/ars_service';
    // private arsServiceBaseUrl = 'http://localhost:8585/ars_service';
    private arsValidateUserInTestTableEndpoint = '/test_users/validateUserInTestTable';
    private arsValidateUserInTestTableWithAuthEndpoint = '/test_users/validateUserInTestTableWithAuth';

    authGetHeaders(cr?: any): HttpHeaders {
        let headers = new HttpHeaders();
        const token = this.userInfoService.getStoredToken();
        headers = headers.append('Content-Type', 'application/json');
        const credentials = 'Basic '
            + btoa(`${cr.username}:${cr.password}`);
        headers = headers.append('Authorization', credentials);
        return headers;
    }

    apiGetHeaders(): HttpHeaders {
        const headers = new HttpHeaders();
        const token = this.userInfoService.getJwtToken();
        const authJwt = 'JWT ' + token;
        // headers = headers.append('Authorization', authJwt);
        headers.set('Authorization', 'Bearer ' + authJwt);
        return headers;
    }

    validateUserInTestTable(urlParams: HttpParams, data?: any): Observable<any> {
        const me = this;
        return this.http.get(this.arsServiceBaseUrl + this.arsValidateUserInTestTableEndpoint, { headers: null, params: urlParams })
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

    validateUserInTestTableWithAuth(urlParams: HttpParams, data?: any): Observable<any> {
        const me = this;
        return this.http.post(this.arsServiceBaseUrl + this.arsValidateUserInTestTableWithAuthEndpoint,
            { params: urlParams, withCredentials: true, headers: this.apiGetHeaders() })
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
        return this.http.get(this.authBaseUrl + this.authEndpoint, { headers: this.authGetHeaders(data), params: urlParams })
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

