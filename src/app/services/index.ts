
import { ModuleWithProviders, NgModule } from '@angular/core';

import { WhiteboardIssueAPI } from '@services/api/whiteboardIssueAPI.service';
import { ReviewAPI } from '@services/api/reviewAPI.service';
import { PartAPI } from '@services/api/partAPI.service';
import { UserAPI } from '@services/api/userAPI.service';
import { DocumentAPI } from '@services/api/documentAPI.service';
import { UserLkupAPI } from '@services/api/userLkupAPI.service';
import { SupplierLkupAPI } from '@services/api/supplierLkupAPI.service';
import { MissionLkupAPI } from '@services/api/missionLkupAPI.service';

export * from '@services/api/whiteboardIssueAPI.service';
export * from '@services/api/reviewAPI.service';
export * from '@services/api/partAPI.service';
export * from '@services/api/userAPI.service';
export * from '@services/api/documentAPI.service';
export * from '@services/api/userLkupAPI.service';
export * from '@services/api/supplierLkupAPI.service';
export * from '@services/api/missionLkupAPI.service';

@NgModule()
export class APIModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: APIModule,
      providers: [
        DocumentAPI,
        PartAPI,
        ReviewAPI,
        UserAPI,
        WhiteboardIssueAPI,
        UserLkupAPI,
        SupplierLkupAPI,
        MissionLkupAPI,
      ],
    };
  }
}
