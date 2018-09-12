import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { arsServiceBaseUrl } from '@environments/environment';
import { Mission } from '@models/ars-app.models';
import { AuthenticationService } from '@services/authentication.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable()
export class MissionLkupAPI {

    constructor(
        private authenticationService: AuthenticationService,
        private http: HttpClient
    ) {}

    getAll(): Observable<Mission[]> {
        return this.http.get<Mission[]>(`${arsServiceBaseUrl}missionLkup`, { headers: this.authenticationService.apiGetHeaders() }).pipe(
            tap(cursor => console.log(`getAllSuppliers returned:`, cursor)),
            catchError(this.handleError)
        );
    }

    /**
     * @param criteria
     * criteria is string that is used as the criteria for a database search of only active users. The endpoint returns a list of userLkup users 
     * who's first or last name CONTAINS the string. The search is case insensitive. While any length string CAN be used here, only strings of 
     * 3 characters or longer should be passed to this endpoint as the database is large and a string shorter than 3 characters will have a long
     * (at least a few seconds) response time.
     */
    getAllActiveWithName(criteria: String): Observable<Mission[]> {
        return this.http.get<Mission[]>(`${arsServiceBaseUrl}missionLkup/${criteria}`, { headers: this.authenticationService.apiGetHeaders() }).pipe(
            tap(cursor => console.log(`getAllActive(suppliers)WithName returned:`, cursor)),
            catchError(this.handleError)
        );
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

