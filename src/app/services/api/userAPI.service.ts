import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { arsServiceBaseUrl } from '@environments/environment';
import { ArsUser, Role, UserType, VehicleSystem, Org, Supplier } from '@models/ars-app.models';
import { AuthenticationService } from '@services/authentication.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable()
export class UserAPI {

    constructor(
        private authenticationService: AuthenticationService,
        private http: HttpClient
    ) {}

    getUser(id): Observable<ArsUser> {
        return this.http.get<ArsUser>(`${arsServiceBaseUrl}arsUsers/${id}`, { headers: this.authenticationService.apiGetHeaders() }).pipe(
            tap(cursor => console.log(`getUser returned:`, cursor)),
            catchError(this.handleError)
        );
    }

    getAll(): Observable<ArsUser[]> {
        return this.http.get<ArsUser[]>(`${arsServiceBaseUrl}arsUsers`, { headers: this.authenticationService.apiGetHeaders() }).pipe(
            tap(cursor => console.log(`getAllUsers returned:`, cursor)),
            catchError(this.handleError)
        );
    }

    getUsersByPart(id: string): Observable<ArsUser[]> {
        return this.http.get<ArsUser[]>(`${arsServiceBaseUrl}arsUsers/part/${id}`, { headers: this.authenticationService.apiGetHeaders() }).pipe(
            tap(cursor => console.log(`getUsersByPart returned:`, cursor)),
            catchError(this.handleError)
        );
    }

    getUsersByDocument(id: string): Observable<ArsUser[]> {
        return this.http.get<ArsUser[]>(`${arsServiceBaseUrl}arsUsers/document/${id}`, { headers: this.authenticationService.apiGetHeaders() }).pipe(
            tap(cursor => console.log(`getUsersByDocument returned:`, cursor)),
            catchError(this.handleError)
        );
    }

    saveUser(user: ArsUser): Observable<ArsUser> {
        return this.http.post<ArsUser>(`${arsServiceBaseUrl}arsUsers`, user).pipe(
            tap(cursor => console.log(`saveUser returned:`, cursor)),
            catchError(this.handleError)
        );
    }

    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(`${arsServiceBaseUrl}roles`, { headers: this.authenticationService.apiGetHeaders() }).pipe(
            tap(cursor => console.log(`getRoles returned:`, cursor)),
            catchError(this.handleError)
        );
    }

    getTypes(): Observable<UserType[]> {
        return this.http.get<UserType[]>(`${arsServiceBaseUrl}types`, { headers: this.authenticationService.apiGetHeaders() }).pipe(
            tap(cursor => console.log(`getTypes returned:`, cursor)),
            catchError(this.handleError)
        );
    }

    getTechnologies(): Observable<VehicleSystem[]> {
        return this.http.get<VehicleSystem[]>(`${arsServiceBaseUrl}vehicleSystemsLkup`, { headers: this.authenticationService.apiGetHeaders() }).pipe(
            tap(cursor => console.log(`getTechnologiess returned:`, cursor)),
            catchError(this.handleError)
        );
    }

    getOrganizations(): Observable<Org[]> {
        return this.http.get<Org[]>(`${arsServiceBaseUrl}orgs`, { headers: this.authenticationService.apiGetHeaders() }).pipe(
            tap(cursor => console.log(`getOrganizations returned:`, cursor)),
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

