
import { Observable } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ArsUser } from '@app/models/ars-app.models';

export class VsData {
    currentUser: ArsUser; // the current, logged in, user
    vsObject: VsObject;
    review?: VsReview;
}

export class VsObject {
    type: string;
    title: string;
    faIcon: IconDefinition; // The icon used when summarizing result count in VsDisplay header.
    pageSize?: number; // The number of results to fetch per page when using pagination. Not including specifies that all results are loaded initially (Not using pagination).
    vsHeight: any;
    displayData$?;
    style?: any;
    showSearch?: boolean;
    parent?: any;
}

export class VsReview {
    type: 'part' | 'document' | 'eid';
    id: number;
    reviewData$: Observable<any>;
    teamData$: Observable<ArsUser[]>;
}
