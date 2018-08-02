import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { arsServiceBaseUrl } from '@environments/environment';

import { Whiteboard } from '@models/test.model';

@Injectable()
export class WhiteboardAPI {
    private _arsServiceBaseUrl = arsServiceBaseUrl;
    review = {};
    Whiteboard = {};
    constructor(private http: HttpClient) { }

    getAllWhiteboard(): Observable<any> {
        return this.http.get(`${this._arsServiceBaseUrl}whiteboards`);
    }

    getWbIssuesByPart(id: string): Observable<any> {
        return this.http.get(`${this._arsServiceBaseUrl}whiteboards/part/${id}`);
    }

    editWhiteboard(id, data: object) {
        return this.http.put<Whiteboard>(`${this._arsServiceBaseUrl}whiteboards/${id}`, data);
    }

    saveWhiteboard(whiteboard: Whiteboard): Observable<Whiteboard> {
        return this.http.post<Whiteboard>(`${this._arsServiceBaseUrl}whiteboards`, whiteboard);
    }
}



