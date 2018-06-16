
import { ModuleWithProviders, NgModule } from '@angular/core';

import { WhiteboardAPI } from '@services/api/whiteboardAPI.service';
import { ReviewAPI } from '@services/api/reviewAPI.service';

export * from '@services/api/whiteboardAPI.service';
export * from '@services/api/reviewAPI.service';

@NgModule()
export class APIModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: APIModule,
      providers: [
        WhiteboardAPI,
        ReviewAPI,
      ],
    };
  }
}
