import { Injectable } from '@angular/core';
import { DocumentAPI, PartAPI, UserAPI, WhiteboardIssueAPI } from '@services/index';
import { AuthenticationService } from '@services/authentication.service';
import { VsData } from '@pages/dynamic/vs-display/vs-data-object';

import { of, Observable } from 'rxjs';

@Injectable()
export class VsDisplayService {
    constructor(
        private partAPI: PartAPI,
        private authenticationService: AuthenticationService,
        private userAPI: UserAPI,
        private documentAPI: DocumentAPI,
        private whiteboardAPI: WhiteboardIssueAPI,
    ) { }

    /**
     * Here, based on the type, we configure and return the HttpClient request to ensure the approriate type
     * is fetched on fetchMore() in VsDisplayComponent.
     * objectType is the type of model we wish to return.
     * reviewType is the what type of review page we are on (once the review object is complete, this should be greatly simplified).
     * 
     * Most of the time, pagination will not be necessary. However, it is a requirement for searches, admin functionality, and feeds (like notifications and messages).
     */
    getBy(data: VsData, page: number): Observable<any[]> {
        console.log('DATA0', data)
        switch (true) {
            case data.vsObject.type === 'part' && !data.review:
                return this.partAPI.getPaginatedPartsByUser(data.currentUser.userId, page, data.vsObject.pageSize);
            default:
                console.error('If a pageSize is set in dynamic service, a function for pagination must be configured in vs-display.service.');
        }
    }
}

