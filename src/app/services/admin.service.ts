import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { arsServiceBaseUrl } from '@environments/environment';

import { HcmList } from '@models/test.model';

@Injectable()
export class AdminService {
    hcmList = {};
    constructor(private http: HttpClient) { }

    getAllHcm(): Observable<any> {
        return this.http.get(`${arsServiceBaseUrl}hardwareCriticalityMatrix`);
    }

    // getReview(id) {
    //     this.http.get('http://localhost:8080/reviews' + id).subscribe(data => {
    //         this.review = data;
    //     });
    // }

    // saveHcm(hcm: HcmList): Observable<HcmList> {
    //     return this.http.post<HcmList>('http://localhost:8080/reviews', review);
    // }



}
