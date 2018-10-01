import { Component } from '@angular/core';
import { DocumentAPI, PartAPI, UserAPI, WhiteboardIssueAPI } from '@services/index';
import { AuthenticationService } from '@services/authentication.service';

import {
    DocumentDetailComponent,
    PartDetailComponent,
    AdminToolsComponent,
} from './_index';

import {
    faUser,
    faFileAlt,
    faStickyNote,
    faEnvelope,
    faCogs,
    faList,
    faChalkboard,
} from '@fortawesome/free-solid-svg-icons';

import { VsDisplayComponent } from './vs-display/vs-display.module';
import { DynamicItem } from './dynamic-item';
import { of, Observable } from 'rxjs';
import { FontawesomeObject, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { User } from '@app/forms/components';
import { Type } from '@angular/core';
import { DashboardNotificationsComponent } from '@app/pages/dynamic/dashboard-notifications/dashboard-notifications.component';
import { VsData } from '@pages/dynamic/vs-display/vs-data-object';
import { share, shareReplay } from 'rxjs/operators';

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
        switch (dynamicType) {
            case 'search':
                return this._getSearch(currentUser, dynamicId);
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

    private _getEIDCardData(currentUser, dynamicId, dynamicType) {
        const reviewData$ = this.partAPI.getPart(dynamicId);
        const teamData$ = this.userAPI.getUsersByPart(dynamicId);
        const documentsData$ = this.documentAPI.getDocumentsByPart(dynamicId);
        const wbIssuesData$ = this.whiteboardAPI.getWbIssuesByPart(dynamicId);
        return [
            new DynamicItem(DocumentDetailComponent, { partData$: reviewData$ }),

            // new DynamicItem(TeamComponent, { type: dynamicType, reviewData$, teamData$ }),

            // new DynamicItem(PartsComponent, {documentsData$: this.documentsData$}),

            // new DynamicItem(WhiteboardComponent, {currentUser: currentUser,  type: dynamicType, wbIssuesData$, documentsData$, teamData$, reviewData$ }),
        ];
    }

    private _getDashboardCardData(currentUser) {
        // Set the page number to start on (typically, this is 0. Otherwise pages are skipped)
        const pageNo = 0;
        // Set the number of results to get on each page
        const pageSize = 50;
        // Set the number of initial pages to get
        const initialPageQuantity = 4;

        // const dashboardNotificationData$ = this.notificationAPI.getAppNotifications();
        const dashboardNotificationData$ = {};
        const displayData$ = this.partAPI.getPaginatedPartsByUser(currentUser.userId, pageNo, pageSize * initialPageQuantity);
        const usersData$ = this.userAPI.getAll();

        let partVsData: VsData = {
            currentUser,
            vsObject: {
                type: 'part',
                title: 'Parts',
                displayData$,
                faIcon: faCogs,
                vsHeight: 'full',
                pageSize,
                style: {
                    /**
                     * Here, we set the flex basis for each of the components that will be on dynamically populated.
                     * The container they are added to is display flex, horizontal, with flex-wrap active.
                     */
                    flex: '2 1 600px'
                },
            },
        }

        let messageVsData: VsData = {
            currentUser,
            vsObject: {
                type: 'message',
                title: 'Messages',
                faIcon: faEnvelope,
                vsHeight: 'full',
                // displayData$,
                pageSize,
                style: {
                    flex: '1 1 400px'
                },
            }
        }

        return [
            new DynamicItem(DashboardNotificationsComponent, { detailComponent: true, ...dashboardNotificationData$ }),

            new DynamicItem(VsDisplayComponent, partVsData),

            new DynamicItem(VsDisplayComponent, messageVsData),
        ];
    }

    private _getPartCardData(currentUser, dynamicId, dynamicType) {
        /**
         * Depending on what information and DynamicItem Components will be needed, each is fetched here along with the specific components
         * that the data will be loaded into. These are combined in the creation of new DynamicItems. This array is then returned for instanciation
         * via the DynamicComponent's Component Factory.
         */
        const reviewData$ = this.partAPI.getPart(dynamicId).pipe(shareReplay(1));
        const teamData$ = this.userAPI.getUsersByPart(dynamicId).pipe(shareReplay(1));
        const documentsData$ = this.documentAPI.getDocumentsByPart(dynamicId).pipe(shareReplay(1));
        const wbIssuesData$ = this.whiteboardAPI.getWbIssuesByPart(dynamicId).pipe(shareReplay(1));
        let messageData$;
        // const messageData$ = this.partAPI.getMessagesByPart(dynamicId);

        const type = 'part';
        // Set the page number to start on (typically, this is 0. Otherwise pages are skipped)
        const pageNo = 0;
        // Set the number of results to get on each page
        const pageSize = 50;
        // Set the number of initial pages to get
        const initialPageQuantity = 4;


        let documentVsData: VsData = {
            currentUser,
            vsObject: {
                type: 'document',
                title: 'Documents',
                faIcon: faFileAlt,
                displayData$: documentsData$,
                vsHeight: 'half',
                style: {
                    /**
                     * Here, we set the flex basis for each of the components that will be on dynamically populated.
                     * The container they are added to is display flex, horizontal, with flex-wrap active.
                     */
                    flex: '1 1 600px'
                }
            },
            review: {
                type: dynamicType,
                id: dynamicId,
                reviewData$,
                teamData$,
            },
        }

        let userVsData: VsData = {
            currentUser,
            vsObject: {
                type: 'user',
                title: 'Team',
                faIcon: faUser,
                displayData$: teamData$,
                vsHeight: 'half',
                style: {
                    /**
                     * Here, we set the flex basis for each of the components that will be on dynamically populated.
                     * The container they are added to is display flex, horizontal, with flex-wrap active.
                     */
                    flex: '1 1 400px'
                }
            },
            review: {
                type: dynamicType,
                id: dynamicId,
                reviewData$,
                teamData$,
            },
        }

        let whiteboardIssuesVsData: VsData = {
            currentUser,
            vsObject: {
                type: 'whiteboardIssue',
                title: 'Whiteboards',
                faIcon: faChalkboard,
                displayData$: wbIssuesData$,
                vsHeight: 'half',
                style: {
                    /**
                     * Here, we set the flex basis for each of the components that will be on dynamically populated.
                     * The container they are added to is display flex, horizontal, with flex-wrap active.
                     */
                    flex: '1 1 600px'
                }
            },
            review: {
                type: dynamicType,
                id: dynamicId,
                reviewData$,
                teamData$,
            },
        }

        let noteVsData: VsData = {
            currentUser,
            vsObject: {
                type: 'note',
                title: 'Notes',
                faIcon: faStickyNote,
                displayData$: messageData$,
                vsHeight: 'half',
                style: {
                    /**
                     * Here, we set the flex basis for each of the components that will be on dynamically populated.
                     * The container they are added to is display flex, horizontal, with flex-wrap active.
                     */
                    flex: '1 1 400px'
                }
            },
            review: {
                type: dynamicType,
                id: dynamicId,
                reviewData$,
                teamData$,
            },
        }

        return [
            new DynamicItem(PartDetailComponent, { detailComponent: true, partData$: reviewData$ }),

            new DynamicItem(VsDisplayComponent, userVsData),

            new DynamicItem(VsDisplayComponent, whiteboardIssuesVsData),

            new DynamicItem(VsDisplayComponent, documentVsData),

            new DynamicItem(VsDisplayComponent, noteVsData),

            // new DynamicItem(WhiteboardComponent, { currentUser: currentUser, type: dynamicType, wbIssuesData$, documentsData$, teamData$, reviewData$ }),
        ];
    }

    private _getDocumentCardData(currentUser, dynamicId, dynamicType) {
        // All of these will be ByReview when review object is created. Detail will need to be flexible based on dynamicType value
        const partData$ = this.partAPI.getPartByDocument(dynamicId);
        const teamData$ = this.userAPI.getUsersByDocument(dynamicId);
        const reviewData$ = this.documentAPI.getById(dynamicId);
        const wbIssuesData$ = this.whiteboardAPI.getWbIssuesByDocument(dynamicId);
        return [
            new DynamicItem(DocumentDetailComponent, { detailComponent: true, documentData$: reviewData$ }),

            // new DynamicItem(TeamComponent, { type: dynamicType, reviewData$, teamData$ }),

            // new DynamicItem(DocumentViewerComponent, {documentsData$: this.documentsData$}),

            // new DynamicItem(WhiteboardComponent, { currentUser: currentUser, type: dynamicType, wbIssuesData$, partData$, teamData$, reviewData$ }),
        ];
    }

    private _getAdminCardData(currentUser) {
        const usersData$ = this.userAPI.getAll();

        let userVsData: VsData = {
            currentUser,
            vsObject: {
                type: 'user',
                title: 'Users',
                faIcon: faUser,
                displayData$: usersData$,
                vsHeight: 'half',
                style: {
                    /**
                     * Here, we set the flex basis for each of the components that will be on dynamically populated.
                     * The container they are added to is display flex, horizontal, with flex-wrap active.
                     */
                    flex: '1 1 400px'
                },
            }
        }

        return [
            new DynamicItem(AdminToolsComponent, { detailComponent: true }),

            new DynamicItem(VsDisplayComponent, userVsData),

            // new DynamicItem(WhiteboardComponent, {currentUser: currentUser,  type: dynamicType, wbIssuesData$, documentsData$, teamData$, reviewData$ }),
        ];
    }

    private _getSearch(currentUser, type?) {
        // Set the number of results to get on each page
        const pageSize = 50;

        let partSearchVsData: VsData = {
            currentUser,
            vsObject: {
                type: type,
                title: 'Results',
                faIcon: faList,
                vsHeight: 'half',
                pageSize,
                showSearch: true,
            }
        }

        return [
            new DynamicItem(VsDisplayComponent, partSearchVsData)
        ];
    }
}

