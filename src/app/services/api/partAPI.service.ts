import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Part } from '@models/ars.models';

@Injectable()
export class PartAPI {
    part = {};
    constructor(private http: HttpClient) { }

    getPart(id: string): Observable<any> {
        return this.http.get(`http://localhost:8080/part/${id}`);
    }

    editPart(id, data: object) {
        return this.http.put<Part>(`http://localhost:8080/part/${id}`, data);
    }

    savePart(review: Part): Observable<Part> {
        return this.http.post<Part>(`http://localhost:8080/part`, review);
    }

    deletePart(id, data: object): Observable<any> {
        return this.http.delete(`http://localhost:8080/part/${id}`, data);
    }

  // editPart(review: Part): Observable<string> {
  //   return this.http.put(`http://localhost:8080/part/${review._id}`, review, { responseType: 'text' });
  // }

}



