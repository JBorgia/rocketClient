import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VsDisplayComponent } from './vs-display.component';
import { IconDataModule } from '@components/icon-data/icon-data.module';
import { VirtualScrollModule } from '@components/virtual-scroll/virtual-scroll.module';
import {
  NoteItemComponent,
  PartItemComponent,
  MessageItemComponent,
  UserItemComponent,
  DocumentItemComponent,
  WhiteboardIssueItemComponent,
  WhiteboardNoteItemComponent,
  WhiteboardNotesComponent,
} from './display-items/_index';
import { VsDisplayHostDirective } from './vs-display-host.directive';
import { VsDisplayService } from './vs-display.service';
import { FormModule } from '@forms/form.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material';
import { CreateComponent } from './toolbar-items/create/create.component';

export * from './vs-display.component';

@NgModule({
  imports: [
    CommonModule,
    VirtualScrollModule,
    IconDataModule,
    FormModule,
    FontAwesomeModule,
    MatTooltipModule,
  ],
  providers: [
    VsDisplayService
  ],
  declarations: [
    NoteItemComponent,
    WhiteboardNoteItemComponent,
    DocumentItemComponent,
    PartItemComponent,
    MessageItemComponent,
    UserItemComponent,
    WhiteboardIssueItemComponent,
    VsDisplayComponent,
    VsDisplayHostDirective,
    CreateComponent,
    WhiteboardNotesComponent,
  ],
  exports: [
    VsDisplayComponent,
  ],
  entryComponents: [
    VsDisplayComponent,
    NoteItemComponent,
    DocumentItemComponent,
    PartItemComponent,
    MessageItemComponent,
    UserItemComponent,
    WhiteboardIssueItemComponent,
    WhiteboardNoteItemComponent,
  ],
})
export class VsDisplayModule { }
