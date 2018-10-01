import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { arsServiceBaseUrl } from '@environments/environment';

import { WhiteboardIssue, WhiteboardNote } from '@models/ars-app.models';
import { AuthenticationService } from '@services/authentication.service';

@Injectable()
export class WhiteboardIssueAPI {
    private _arsServiceBaseUrl = arsServiceBaseUrl;
    review = {};
    whiteboards: Observable<any>;

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService,
    ) { }

    getAll(): Observable<any> {
        if (this.whiteboards) {
            return this.whiteboards;
        } 
        this.whiteboards = this.http.get(`${this._arsServiceBaseUrl}whiteboardIssues`);
        return this.whiteboards;
    }

    getWbIssuesByPart(id: string): Observable<any> {
        return this.http.get(`${this._arsServiceBaseUrl}whiteboardIssues/part/${id}`);
    }

    getWbIssuesByDocument(id: string): Observable<any> {
        return this.http.get(`${this._arsServiceBaseUrl}whiteboardIssues/document/${id}`);
    }

    updateWhiteboardIssue(whiteboardIssue: WhiteboardIssue) {
        return this.http.put<WhiteboardIssue>(`${this._arsServiceBaseUrl}whiteboardIssues/${whiteboardIssue.issueId}`, whiteboardIssue);
    }

    saveWhiteboardIssue(whiteboardIssue: WhiteboardIssue): Observable<any> {
        return this.http.post(`${this._arsServiceBaseUrl}whiteboardIssues`, whiteboardIssue, { headers: this.authenticationService.apiGetHeaders() });
    }
//, { headers: this.authenticationService.apiGetHeaders() }
    // Associated Lookup APIs
    getWbStatusOptions(){
        return this.http.get<any>(`${this._arsServiceBaseUrl}/whiteboardStatusLkup`);
    }

    getWbCategories(){
        return this.http.get<any>(`${this._arsServiceBaseUrl}/whiteboardCategoryLkup`);
    }

    getNotesByIssue(issueId){
        return this.http.get<WhiteboardNote[]>(`${this._arsServiceBaseUrl}/whiteboardNotes${issueId}`)
    }

    saveWhiteboardNote(whiteboardNote: WhiteboardNote): Observable<any> {
        return this.http.post(`${this._arsServiceBaseUrl}whiteboardNotes`, whiteboardNote, { headers: this.authenticationService.apiGetHeaders() });
    }
}
