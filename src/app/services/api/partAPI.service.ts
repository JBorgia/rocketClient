import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Part } from '@models/ars-app.models';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class PartAPI {
    part = {};
    userParts$: Observable<any>;
    documentParts$: Observable<any>;
    page: number;
    
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(`http://localhost:8080/parts`);
    }

    getPart(id: string): Observable<any> {
        return this.http.get(`http://localhost:8080/parts/${id}`);
    }

    getPaginatedParts(page, pageSize): Observable<any> {
        return this.http.get(`http://localhost:8080/parts/pagination/${page}/${pageSize}`);
    }

    getPaginatedPartsByUser(userId, page, pageSize): Observable<any> {
        return this.http.get(`http://localhost:8080/parts/pagination/${userId}/${page}/${pageSize}`).pipe(
            // tap(res => {
            //     console.log('response from getPaginatedPartByUser:', res);

            // }),
            map((res: any) => res.content)
        );
    }

    getPartsByUser(id: number): Observable<any> {
        if (this.userParts$) {
            return this.userParts$;
        }
        this.userParts$ = this.http.get(`http://localhost:8080/parts/user/${id}`);
        return this.userParts$;
    }

    getPartByDocument(id: string): Observable<any> {
        if (this.documentParts$) {
            return this.documentParts$;
        }
        this.documentParts$ = this.http.get(`http://localhost:8080/parts/document/${id}`);
        return this.documentParts$;
    }

    editPart(id, data: object) {
        return this.http.put<Part>(`http://localhost:8080/parts/${id}`, data);
    }

    savePart(review: Part): Observable<Part> {
        return this.http.post<Part>(`http://localhost:8080/parts`, review);
    }

    deletePart(id, data: object): Observable<any> {
        return this.http.delete(`http://localhost:8080/parts/${id}`, data);
    }

  // editPart(review: Part): Observable<string> {
  //   return this.http.put(`http://localhost:8080/part/${review._id}`, review, { responseType: 'text' });
  // }

}



