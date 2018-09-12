import { Component } from '@angular/core';
import { DocumentAPI, PartAPI, UserAPI, WhiteboardIssueAPI } from '@services/index';
import { AuthenticationService } from '@services/authentication.service';

import {
    DocumentsComponent,
    DocumentDetailComponent,
    PartDetailComponent,
    TeamComponent,
    WhiteboardComponent,
    UsersComponent,
    ReviewsComponent,
} from './_index';

import { VsResultsComponent } from './vs-results/vs-results.module';
import { DynamicItem } from './dynamic-item';
import { of } from 'rxjs';
import { SearchPartsFormComponent } from '@app/forms';

/**
 * Most pages of the application are built dynmically. This gives developers the ability to quickly create new 'pages' by reusing existing components.
 * It also (and in many cases more importantly) allows for developers on this application to pivot quickly to changes in client requests and alterations
 * to scope. The form building system also follows this factory/prototype model.
 * 
 * DynamicService is where pages are built from components depending upon the type of page requested (dynmicType in mapCards()). As the app grows, it may
 * be prudent in the future to move the get______CardData() to their own directive and use a mapper to build them from simple objects like forms does with
 * DynamicComponentDirective.
 */

@Component({
    selector: 'app-dynamic',
    templateUrl: './dynamic.component.html',
    styleUrls: ['./dynamic.component.scss']
})

export class DynamicService {
    constructor(
        private partAPI: PartAPI,
        private authenticationService: AuthenticationService,
        private userAPI: UserAPI,
        private documentAPI: DocumentAPI,
        private whiteboardAPI: WhiteboardIssueAPI,
    ) {
    }

    /**
     * mapCards is simply used to determin from dynamicType, which array of page data components need to be built and returned for the 
     * DynamicComponent to properly populate itself. As of writing this comment, it should be the only publicly accessible function in
     * the DynamicService class.
     */
    mapCards(dynamicType, currentUser, dynamicId?): DynamicItem[] {
        if (dynamicId === 'search') {
            console.log(`...loading search for ${dynamicType}`);
            return this._getSearch(currentUser, dynamicType);
        } else {
            switch (dynamicType) {
                case 'eid':
                    return this._getEIDCardData(currentUser, dynamicId, dynamicType);
                case 'part':
                    return this._getPartCardData(currentUser, dynamicId, dynamicType);
                case 'document':
                    return this._getDocumentCardData(currentUser, dynamicId, dynamicType);
                case 'admin':
                    return this._getAdminCardData(currentUser);
                case 'dashboard':
                    return this._getDashboardCardData(currentUser);
                default:
                    console.log('Option not configured.');
            }
        }

    }

    private _getEIDCardData(currentUser, dynamicId, dynamicType) {
        const reviewData$ = this.partAPI.getPart(dynamicId);
        const teamData$ = this.userAPI.getUsersByPart(dynamicId);
        const documentsData$ = this.documentAPI.getDocumentsByPart(dynamicId);
        const wbIssuesData$ = this.whiteboardAPI.getWbIssuesByPart(dynamicId);
        return [
            new DynamicItem(DocumentDetailComponent, { partData$: reviewData$ }),

            new DynamicItem(TeamComponent, { type: dynamicType, reviewData$, teamData$ }),

            // new DynamicItem(PartsComponent, {documentsData$: this.documentsData$}),

            // new DynamicItem(WhiteboardComponent, {currentUser: currentUser,  type: dynamicType, wbIssuesData$, documentsData$, teamData$, reviewData$ }),
        ];
    }

    private _getPartCardData(currentUser, dynamicId, dynamicType) {
        /**
         * Depending on what information and DynamicItem Components will be needed, each is fetched here along with the specific components
         * that the data will be loaded into. These are combined in the creation of new DynamicItems. This array is then returned for instanciation
         * via the DynamicComponent's Component Factory.
         */
        const reviewData$ = this.partAPI.getPart(dynamicId);
        const teamData$ = this.userAPI.getUsersByPart(dynamicId);
        const documentsData$ = this.documentAPI.getDocumentsByPart(dynamicId);
        const wbIssuesData$ = this.whiteboardAPI.getWbIssuesByPart(dynamicId);
        return [
            new DynamicItem(PartDetailComponent, { partData$: reviewData$ }),

            new DynamicItem(TeamComponent, { type: dynamicType, reviewData$, teamData$ }),

            new DynamicItem(DocumentsComponent, { documentsData$ }),

            new DynamicItem(WhiteboardComponent, { currentUser: currentUser, type: dynamicType, wbIssuesData$, documentsData$, teamData$, reviewData$ }),
        ];
    }

    private _getDocumentCardData(currentUser, dynamicId, dynamicType) {
        // All of these will be ByReview when review object is created. Detail will need to be flexible based on dynamicType value
        const partData$ = this.partAPI.getPartByDocument(dynamicId);
        const teamData$ = this.userAPI.getUsersByDocument(dynamicId);
        const reviewData$ = this.documentAPI.getById(dynamicId);
        const wbIssuesData$ = this.whiteboardAPI.getWbIssuesByDocument(dynamicId);
        return [
            new DynamicItem(DocumentDetailComponent, { documentData$: reviewData$ }),

            new DynamicItem(TeamComponent, { type: dynamicType, reviewData$, teamData$ }),

            // new DynamicItem(DocumentViewerComponent, {documentsData$: this.documentsData$}),

            new DynamicItem(WhiteboardComponent, { currentUser: currentUser, type: dynamicType, wbIssuesData$, partData$, teamData$, reviewData$ }),
        ];
    }

    private _getAdminCardData(currentUser) {
        const usersData$ = this.userAPI.getAll();
        const documentsData$ = this.documentAPI.getPaginatedAll(1);
        const wbIssuesData$ = this.whiteboardAPI.getAll();
        return [
            new DynamicItem(UsersComponent, { usersData$ }),

            new DynamicItem(DocumentsComponent, { documentsData$ }),

            // new DynamicItem(WhiteboardComponent, {currentUser: currentUser,  type: dynamicType, wbIssuesData$, documentsData$, teamData$, reviewData$ }),
        ];
    }

    private _getDashboardCardData(currentUser) {
        // Get from the first page of results
        const initPage = 0;
        // Get the initial set of 200 
        const initCount = 200;

        const reviewsData$ = this.partAPI.getPaginatedPartsByUser(currentUser.userId, initPage, initCount);
        const usersData$ = this.userAPI.getAll();

        return [

            new DynamicItem(
                VsResultsComponent,
                { 
                    currentUser,
                    reviewsData$,
                    dynamicType: 'part',
                    style: {
                        flex: '4 2 600px' // Here, we set the flex basis for each of the components that will be on dynamically populated
                    },
                }),
            
            new DynamicItem(
                VsResultsComponent,
                { 
                    currentUser, 
                    reviewsData$,
                    dynamicType: 'part',
                    style: {
                        flex: '1 1 300px'
                    },
                }),
        ];
    }

    private _getSearch(currentUser, dynamicType) {
        switch (dynamicType) {
            case 'eid':
            case 'part':
                return [
                    new DynamicItem(SearchPartsFormComponent, { currentUser }),

                    new DynamicItem(VsResultsComponent, { currentUser, dynamicType }),
                ];
            case 'document':
            default:
                console.log('Option not configured.');
        }
    }
}

