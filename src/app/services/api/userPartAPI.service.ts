import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class UserPartAPI {
    userParts$: Observable<any>;
    constructor(private http: HttpClient) { }

    getPartForUser(id: number): Observable<any> {
        if (this.userParts$) {
            return this.userParts$;
        }
        this.userParts$ = this.http.get(`http://localhost:8080/parts/user/${id}`);
        return this.userParts$;
    }
}



