import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

// import { Document } from '@models/document.model';

import { AuthenticationAPI } from '@services/api//authenticationAPI.service';

import { arsServiceBaseUrl } from '@environments/environment';


@Injectable()
export class DocumentAPI {

    constructor(
        private authenticationAPI: AuthenticationAPI,
        private http: HttpClient) { }
    
    getDocumentsByPart(partId: string): Observable<Document[]> {
        return this.http.get<Document[]>(`${arsServiceBaseUrl}documents/part/${partId}`, { headers: this.authenticationAPI.apiGetHeaders() }).pipe(
            tap(cursor => console.log(`getDocumentsByPart returned:`, cursor)),
            catchError(this.handleError)
        );
    }

    saveDocument(document: Document): Observable<Document> {
        return this.http.post<Document>(`${arsServiceBaseUrl}documents`, document).pipe(
            tap(cursor => console.log(`saveDocument returned:`, cursor)),
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
        // return an observable with a document-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }
}

