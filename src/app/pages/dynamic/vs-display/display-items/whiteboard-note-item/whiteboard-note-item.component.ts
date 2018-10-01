import { Component, OnInit, Input } from '@angular/core';
import { WhiteboardNote, ArsUser } from '@app/models/ars-app.models';

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
import { Observable } from 'rxjs';
import { filter, find, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-whiteboard-note-item',
  templateUrl: './whiteboard-note-item.component.html',
  styleUrls: ['./whiteboard-note-item.component.scss']
})
export class WhiteboardNoteItemComponent implements OnInit {
  item: WhiteboardNote;
  review;
  faStickyNote = faStickyNote;
  faEnvelope = faEnvelope;
  faEye = faEye;
  isHover = false;
  tooltip: string;
  defaultIcon: IconDefinition;
  alternateIcon: IconDefinition;
  createdBy$: Observable<ArsUser>;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.createdBy$ = this.review.teamData$.pipe(
      map((users: ArsUser[]) => {
        const creator = users.find(user => user.userId === this.item.createdBy);
        return `${creator.lastName}, ${creator.firstName} #${creator.userId}`;
      })
    );
  }

  closeWhiteboardNote(whiteboard: WhiteboardNote) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { whiteboard, type: this.review.type, review: this.review, componentClass: CloseWhiteboardIssueFormComponent, title: `Whiteboard ${this.item.noteId}` },
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('submitted', data);
    });
  }

  /**
   * openObject is the function call for PAGE editting
   *
   * @param obj the object being opened in a new page for editting
   */
  openInPage(whiteboard: WhiteboardNote): void {
    console.log('Opening in new page', whiteboard);
    let objId = whiteboard ? whiteboard.noteId : null;
  }
}
