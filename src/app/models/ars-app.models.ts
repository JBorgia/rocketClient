export class ArsUser {
  constructor(
    firstName?: string,
    lastName?: string,
    orgName?: string,
    createdBy?: ArsUser,
    roleName?: Role,
    userType?: UserType,
    supplierCode?: string,
    team?: string,
    technology?: VehicleSystem,
    email?: string,
    company?: string,
    supplierName?: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.orgName = orgName;
    this.isActive = 'Y'; // in database is char. Default is 'Y'
    this.createdOn = new Date();
    this.createdBy = createdBy;
    this.lastUpdatedBy = createdBy;
    this.roleName = roleName;
    this.userType = userType;
    this.supplierCode = supplierCode;
    this.team = team;
    this.technology = technology;
    this.email = email;
    this.company = company;
    this.supplierName = supplierName;
  }

  userId: string;
  firstName?: string;
  lastName?: string;
  orgName?: string;
  isActive: string; // in database is char. Default is 'Y'
  createdOn: Date;
  createdBy?: ArsUser;
  lastUpdatedOn?: Date;
  lastUpdatedBy?: ArsUser;
  roleName?: Role;
  userType?: UserType;
  supplierCode?: string;
  team?: string;
  technology?: VehicleSystem;
  email?: string;
  company?: string;
  supplierName?: string;
}

export class Role {
  roleName: string;
  description?: string;
}

export class UserType {
  userType: string;
  description?: string;
}

export class VehicleSystem {
  vehicleSystem?: string;
}

export class Part {
  partId: number;
  partNo: string;
  partName: string;
  drawingNo: string;
  serialNo: string;
  lotNo?: string;
  supplierCode: string;
  supplierName: string;
  vehicleProgram: string;
  vehicleSystem: string;
  missionName?: string;
  tailNo?: string;
  partReviewStatus?: string;
  partReviewDate?: Date;
  partSource: string;
  createdOn: Date;
  createdBy: string;
  lastUpdatedOn?: Date;
  lastUpdatedBy?: ArsUser;
}

export class Document {
  documentId: number;
  partId: number;
  docSource: string;
  docNo: string;
  docType: string;
  docLocation?: string;
  docFilename?: string;
  docDesc: string;
  docStatus: string;
  docMediaType: string;
  docDate: Date;
  docSignerName?: string;
  docSignedRole?: Date;
  docSignedDate?: Date;
  docSignerNote?: string;
  dockIdInSource: string;
  createdOn: Date;
  /** createdBy should be an actual user one the front end to ensure data is easily displayed.
   * Also, as we only fetch part details when requested, it'd make sense to grab it here
   * rather than in a separate request.
   */
  createdBy: string;
  lastUpdatedOn?: Date;
  /** lastUpdatedBy should be an actual user one the front end to ensure data is easily displayed.
   * Also, as we only fetch part details when requested, it'd make sense to grab it here
   * rather than in a separate request.
   */
  lastUpdatedBy?: string;
}

export class DocNotes {
  documentId: number;
  noteId: number;
  note: string;
  createdOn: Date;
  /** createdBy should be an actual user one the front end to ensure data is easily displayed.
   * Also, as we only fetch part details when requested, it'd make sense to grab it here
   * rather than in a separate request.
   */
  createdyBy: string;
  lastUpdatedOn: Date;
  /** lastUpdatedBy should be an actual user one the front end to ensure data is easily displayed.
   * Also, as we only fetch part details when requested, it'd make sense to grab it here
   * rather than in a separate request.
   */
  lastUpdatedBy: string;
}

export class DocReviewActivity {
  documentId: number;
  docAssignedTo?: string;
  docReviewedBy?: string;
  dockReviewDate?: Date;
  docReviewNote?: string;
}


export class WhiteboardIssue {
  constructor(
    issueId: number,
    title: string,
    descr: string,
    status: WhiteboardStatusLkup, // is an fk
    assignedToFirstName: string,
    closedOn: Date,
    createdOn: Date,
    createdByFirstName: string,
    lastUpdatedOn: Date,
    lastUpdatedByFirstName: string,
    closedByFirstName: string,
    part: Part, // is an fk
    documentId: number,
    pages: string,
    action: string,
    response: string,
    closedComment: string,
    responseByFirstName: string,
    lastUpdatedByUser: string,
    createdByUser: string,
    assignedToUser: string,
    responseByUser: string,
    assignedToLastName: string,
    closedByLastName: string,
    lastUpdatedByLastName: string,
    responseByLastName: string,
    closedByUser: string,
    createdByLastName: string,
    category: string,
    issueSeq: number,
  ) {
    this.issueId = issueId;
    this.title = title;
    this.descr = descr;
    this.status = status; // is an fk
    this.assignedToFirstName = assignedToFirstName;
    this.closedOn = closedOn;
    this.createdOn = createdOn;
    this.createdByFirstName = createdByFirstName;
    this.lastUpdatedOn = lastUpdatedOn;
    this.lastUpdatedByFirstName = lastUpdatedByFirstName;
    this.closedByFirstName = closedByFirstName;
    this.part = part; // is an fk
    this.documentId = documentId;
    this.pages = pages;
    this.action = action;
    this.response = response;
    this.closedComment = closedComment;
    this.responseByFirstName = responseByFirstName;
    this.lastUpdatedByUser = lastUpdatedByUser;
    this.createdByUser = createdByUser;
    this.assignedToUser = assignedToUser;
    this.responseByUser = responseByUser;
    this.assignedToLastName = assignedToLastName;
    this.closedByLastName = closedByLastName;
    this.lastUpdatedByLastName = lastUpdatedByLastName;
    this.responseByLastName = responseByLastName;
    this.closedByUser = closedByUser;
    this.createdByLastName = createdByLastName;
    this.category = category;
    this.issueSeq = issueSeq;
  }

  issueId: number;
  title: string;
  descr: string;
  status: WhiteboardStatusLkup; // is an fk
  assignedToFirstName: string;
  closedOn: Date;
  createdOn: Date;
  createdByFirstName: string;
  lastUpdatedOn: Date;
  lastUpdatedByFirstName: string;
  closedByFirstName: string;
  part: Part; // is an fk
  documentId: number;
  pages: string;
  action: string;
  response: string;
  closedComment: string;
  responseByFirstName: string;
  lastUpdatedByUser: string;
  createdByUser: string;
  assignedToUser: string;
  responseByUser: string;
  assignedToLastName: string;
  closedByLastName: string;
  lastUpdatedByLastName: string;
  responseByLastName: string;
  closedByUser: string;
  createdByLastName: string;
  category: string;
  issueSeq: number;
}

export class WhiteboardStatusLkup { }
