import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { arsServiceBaseUrl } from '@environments/environment';

import { Message } from '@models/ars-app.models';

@Injectable()
export class MessageAPI {
    private _arsServiceBaseUrl = arsServiceBaseUrl;
    review = {};
    Message = {};
    constructor(private http: HttpClient) { }

    getAllMessage(): Observable<any> {
        return this.http.get(`${this._arsServiceBaseUrl}messages`);
    }

    getWbIssuesByPart(id: string): Observable<any> {
        return this.http.get(`${this._arsServiceBaseUrl}messages/part/${id}`);
    }

    editMessage(id, data: object) {
        return this.http.put<Message>(`${this._arsServiceBaseUrl}messages/${id}`, data);
    }

    saveMessage(message: Message): Observable<Message> {
        return this.http.post<Message>(`${this._arsServiceBaseUrl}messages`, message);
    }
}



