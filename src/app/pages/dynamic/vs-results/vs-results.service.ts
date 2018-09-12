import { Component, Injectable } from '@angular/core';
import { DocumentAPI, PartAPI, UserAPI, WhiteboardIssueAPI } from '@services/index';
import { AuthenticationService } from '@services/authentication.service';

import { of, Observable } from 'rxjs';
import { ChangeEvent } from '@app/components/virtual-scroll/virtual-scroll.component';

@Injectable()
export class VsResultsService {
    constructor(
        private partAPI: PartAPI,
        private authenticationService: AuthenticationService,
        private userAPI: UserAPI,
        private documentAPI: DocumentAPI,
        private whiteboardAPI: WhiteboardIssueAPI,
    ) {} 

    /**
     * Here, based on the type, we configure and return the HttpClient request to ensure the approriate type
     * is fetched on fetchMore() in VsResultsComponent.
     */
    getByType(type, userId: number, page: number, pageSize: number): Observable<any[]> {
        switch(type){
            case 'part':
                return this.partAPI.getPaginatedPartsByUser(userId, page, pageSize);
            case 'message':
                // return this.messageAPI.getPaginatedMessagesByUser(userId, page, 50);
            case 'document':
                // return this.documentAPI.getPaginatedDocumentsByUser(userId, this.page, 50);
        }
    }
}

