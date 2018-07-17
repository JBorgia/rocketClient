export class ArsUser {
  constructor(
    firstName?: string,
    lastName?: string,
    orgName?: string,
    createdBy?: string,
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
  createdBy?: string;
  lastUpdatedOn?: Date;
  lastUpdatedBy?: string;
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
  lastUpdatedBy?: string;
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
  createdBy: string;
  lastUpdatedOn?: Date;
  lastUpdatedBy?: string;
}

export class DocNotes {
  documentId?: number;
  noteId: number;
  note: string;
  createdOn: Date;
  createdyBy: string;
  lastUpdatedOn?: Date;
  lastUpdatedBy?: string;
}

export class DocReviewActivity {
  documentId: number;
  docAssignedTo?: string;
  docReviewedBy?: string;
  dockReviewDate?: Date;
  docReviewNote?: string;
}
