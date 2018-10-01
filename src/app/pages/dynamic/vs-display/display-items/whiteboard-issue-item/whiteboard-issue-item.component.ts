import { Component, OnInit, Input } from '@angular/core';
import { WhiteboardIssue } from '@app/models/ars-app.models';

import {
   faEnvelope, faDoorOpen, faDoorClosed, IconDefinition, 
} from '@fortawesome/free-solid-svg-icons';
import {
  faStickyNote, 
} from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '@app/components/modal/modal.component';
import { 
  CloseWhiteboardIssueFormComponent
} from '@app/forms';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { WhiteboardNotesComponent } from './whiteboard-notes/whiteboard-notes.component';

@Component({
  selector: 'app-whiteboard-issue-item',
  templateUrl: './whiteboard-issue-item.component.html',
  styleUrls: ['./whiteboard-issue-item.component.scss']
})
export class WhiteboardIssueItemComponent implements OnInit {
  item: WhiteboardIssue;
  review;
  faStickyNote = faStickyNote;
  faEnvelope = faEnvelope;
  faEye = faEye;
  isHover = false;
  tooltip: string;
  defaultIcon: IconDefinition;
  alternateIcon: IconDefinition;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    console.log('ITEM', this.item);
    this.setIconAndTooltip();
  }

  closeWhiteboardIssue(whiteboard: WhiteboardIssue) {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: { whiteboard, type: this.review.type, review: this.review, componentClass: CloseWhiteboardIssueFormComponent, title: `Whiteboard ${this.item.issueId}` },
      });
      dialogRef.afterClosed().subscribe(data => {
        console.log('submitted', data);
      });
  }

  viewWhiteboardIssue(whiteboard: WhiteboardIssue) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { whiteboard, type: this.review.type, review: this.review, componentClass: WhiteboardNotesComponent, title: `Whiteboard Note for ${this.item.issueId}` },
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('submitted', data);
    });
  }

  setIconAndTooltip() {
    if (this.item.status.statusId === 'Open') {
      this.tooltip = `Close whiteboard issue #${this.item.index}`;
      this.defaultIcon = faDoorOpen;
      this.alternateIcon = faDoorClosed;
    } else {
      this.tooltip = `Reopen whiteboard issue #${this.item.index}`;
      this.defaultIcon = faDoorClosed;
      this.alternateIcon = faDoorOpen;
    }
  }

  /**
   * openObject is the function call for PAGE editting
   *
   * @param obj the object being opened in a new page for editting
   */
  openInPage(whiteboard: WhiteboardIssue): void {
    console.log('Opening in new page', whiteboard);
    let objId = whiteboard ? whiteboard.issueId : null;
  }
}
