
import { ModuleWithProviders, NgModule } from '@angular/core';

import { WhiteboardAPI } from '@services/api/whiteboardAPI.service';
import { ReviewAPI } from '@services/api/reviewAPI.service';
import { PartAPI } from '@services/api/partAPI.service';
import { UserAPI } from '@services/api/userAPI.service';
import { DocumentAPI } from '@services/api/documentAPI.service';
import { AuthenticationAPI } from '@services/api/authenticationAPI.service';
import { UserPartAPI } from '@services/api/userPartAPI.service';

export * from '@services/api/whiteboardAPI.service';
export * from '@services/api/reviewAPI.service';
export * from '@services/api/partAPI.service';
export * from '@services/api/userAPI.service';
export * from '@services/api/authenticationAPI.service';
export * from '@services/api/documentAPI.service';
export * from '@services/api/userPartAPI.service';

@NgModule()
export class APIModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: APIModule,
      providers: [
        AuthenticationAPI,
        DocumentAPI,
        PartAPI,
        ReviewAPI,
        UserAPI,
        UserPartAPI,
        WhiteboardAPI,
      ],
    };
  }
}
