import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Whiteboard } from '@models/test.model';

@Injectable()
export class WhiteboardAPI {
    review = {};
    Whiteboard = {};
    constructor(private http: HttpClient) { }

    getAllWhiteboard(): Observable<any> {
        return this.http.get('http://localhost:8080/Whiteboards');
    }

    editWhiteboard(id, data: object) {
        return this.http.put<Whiteboard>('http://localhost:8080/Whiteboards/' + id, data);
    }

    saveWhiteboard(whiteboard: Whiteboard): Observable<Whiteboard> {
        return this.http.post<Whiteboard>('http://localhost:8080/Whiteboards', whiteboard);
    }
}



