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

  userId: number;
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
  descr?: string;
}

export class UserType {
  userType: string;
  descr?: string;
}

export class Org {
  orgName: string;
  descr?: string;
}

export class VehicleSystem {
  vehicleSystem: string;
  descr?: string;
}

export class Supplier {
  supplierCode: string;
  supplierName: string;
  city: string;
  zip: string;
  cageCode: string;
  sourceSystem: string;
  descr?: string;
}

export class Mission {
  missionName: string;
  tailNo: string;
  flownOnDate: Date;
  projectedLaunchDate: Date;
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
  createdBy: number;
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
  createdBy: number;
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
    lastUpdatedByUser: number,
    createdByUser: number,
    assignedToUser: string,
    responseByUser: number,
    assignedToLastName: string,
    closedByLastName: string,
    lastUpdatedByLastName: string,
    responseByLastName: string,
    closedByUser: number,
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
  index?: number; // this is something that is added for reference by the front end. It does not exist in the database.
  issueId?: number;
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
  lastUpdatedByUser: number;
  createdByUser: number;
  assignedToUser: string;
  responseByUser: number;
  assignedToLastName: string;
  closedByLastName: string;
  lastUpdatedByLastName: string;
  responseByLastName: string;
  closedByUser: number;
  createdByLastName: string;
  category: string;
  issueSeq: number;
  whiteboardDocs?: WhiteboardDoc[]; // different form
  whiteboardNotes?: WhiteboardNote[]; // different form
  rids?: RID[]; // different form
}

export class WhiteboardDoc {
  constructor(
    id: number,
    whiteboardIssue: string,
    document: string,
    createdOn: Date,
    createdBy: Date,
    pages?: number,
  ) {
    this.id = id;
    this.whiteboardIssue = whiteboardIssue;
    this.document = document;
    this.createdOn = createdOn;
    this.createdBy = createdBy;
    this.pages = pages;
  }
  id: number;
  whiteboardIssue: string;
  document: string;
  createdOn: Date;
  createdBy: Date;
  pages?: number;
}

export class WhiteboardNote {
  constructor(
    note: string,
    createdOn: Date,
    createdBy: number,
    lastUpdatedOn: Date,
    lastUpdatedBy: number,
    whiteboardIssue?: WhiteboardIssue,
    noteId?: number
  ) {
    this.note = note;
    this.createdOn = createdOn;
    this.createdBy = createdBy;
    this.lastUpdatedOn = lastUpdatedOn;
    this.lastUpdatedBy = lastUpdatedBy;
    this.whiteboardIssue = whiteboardIssue;
    this.noteId = noteId;
  }
  note: string;
  createdOn: Date;
  createdBy: number;
  lastUpdatedOn: Date;
  lastUpdatedBy: number;
  whiteboardIssue?: WhiteboardIssue
  noteId?: number;
}

export class RID {
  constructor(
    ridId: number,
    partId: number,
    title: string,
    descr: string,
    ridridStatusLkup: ridridStatusLku,
    lead: string,
    closedOn: Date,
    closedBy: Date,
    createdOn: Date,
    createdBy: Date,
    lastUpdatedOn: Date,
    lastUpdatedBy: Date,
    category: RIDCategoryLkup,
    whiteboardIssues: WhiteboardIssue,
    ridNotes: RIDNote,
  ) {
    this.ridId = ridId;
    this.partId = partId;
    this.title = title;
    this.descr = descr;
    this.ridStatusLkup = this.ridStatusLkup;
    this.lead = lead;
    this.closedOn = closedOn;
    this.closedBy = closedBy;
    this.createdOn = createdOn;
    this.createdBy = createdBy;
    this.lastUpdatedOn = lastUpdatedOn;
    this.lastUpdatedBy = lastUpdatedBy;
    this.category = category;
    this.whiteboardIssues = whiteboardIssues;
    this.ridNotes = ridNotes;
  }
  ridId: number;
  partId: number;
  title: string;
  descr: string;
  ridStatusLkup: ridridStatusLku;
  lead: string;
  closedOn: Date;
  closedBy: Date;
  createdOn: Date;
  createdBy: Date;
  lastUpdatedOn: Date;
  lastUpdatedBy: Date;
  category: RIDCategoryLkup;
  whiteboardIssues: WhiteboardIssue;
  ridNotes: RIDNote;
}

export class WhiteboardStatusLkup {
  constructor(
    statusId: string,
    descr: string,
    whiteboardIssues: WhiteboardIssue,
  ) {
    this.statusId = statusId;
    this.descr = descr;
    this.whiteboardIssues = whiteboardIssues;
  }
  statusId: string;
  descr: string;
  whiteboardIssues: WhiteboardIssue;
}

export class RIDNote {
  constructor(
    id: number,
    rids: RID,
    note: string,
    createdOn: Date,
    createdBy: number,
    lastUpdatedOn: Date,
    lastUpdatedBy: string,
  ) {
    this.id = id;
    this.rids = rids;
    this.note = note;
    this.createdOn = createdOn;
    this.createdBy = createdBy;
    this.lastUpdatedOn = lastUpdatedOn;
    this.lastUpdatedBy = lastUpdatedBy;

  }
  id: number;
  rids: RID;
  note: string;
  createdOn: Date;
  createdBy: number;
  lastUpdatedOn: Date;
  lastUpdatedBy: string;
}

export class ridridStatusLku {
  constructor(
    statusId: string,
    descr: string,
    rids: RID,
  ) {
    this.statusId = statusId;
    this.descr = descr;
    this.rids = rids;
  }
  statusId: string;
  descr: string;
  rids: RID;
}

export class RIDCategoryLkup {
  constructor(
    category: string,
    descr: string,
    rids: RID,
  ) {
    this.category = category;
    this.descr = descr;
    this.rids = rids;
  }
  category: string;
  descr: string;
  rids: RID;
}

export class Message {
  subject: string;
  recipients: string[];
  message: string;
  createdBy: ArsUser[];
}

export class Note {
  partId: string;
  noteId: string;
  note: string;
  createdOn: Date;
  createdBy: number; 
  lastUpdatedOn: Date;
  lastUpdatedBy: number;
}