export class ArsUser {
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
  createdBy: string;
  lastUpdatedOn?: Date;
  lastUpdatedBy?: string;
}
