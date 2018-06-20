// move models to the pages that handle them

export class Review {
    id: number;
    documentName?: string;
    documentType?: string;
    assignTo?: string;
    reviewedBy?: string;
    reviewedDate?: string;
    reviewed?: boolean;
    numberOfIssues?: number;
    comments?: string;
}

export class Whiteboard {
    id: number;
    initiator: string;
    document: string;
    issues: string;
    action: string;
    assignTo: string;
    status: string;
    response: string;
    openDate: string;
    closedDate: string;
    closedComment: string;
    responseBy: string;
    closedBy: string;
    ridIssue: string;
}

export class ReviewUser  {
    id: number;
    firstName: string;
    lastName: string;
    company: string;
    team: string;
    technology: string;
    roleName: string;
}


export class HcmList {
    hcmId: number;
    partNo: string;
    supplierCode: string;
    vehicleProgram: string;
    vehicleSystem: string;
    partName: string;
    drawingNo: string;
    supplierName: string;
    hcmComment: string;
    reviewType: string;
    partActiveFlag: string;
    partActiveStartDate: Date;
    partActiveEndDate: Date;
    partActiveRangeEnteredBy: string;
    partActiveRangeComments: string;
    createdOn: Date;
    createdBy: string;
    lastUpdatedOn: Date;
    lastUpdatedBy: string;
}
