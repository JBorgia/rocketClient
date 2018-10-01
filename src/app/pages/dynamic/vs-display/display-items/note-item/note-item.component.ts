import { Component, OnInit, Input } from '@angular/core';
import { Note } from '@app/models/ars-app.models';

import {
  faExternalLinkAlt,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CreateWhiteboardNoteFormComponent } from '@app/forms';
import { ModalComponent } from '@app/components/modal/modal.component';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss']
})
export class NoteItemComponent implements OnInit {
  item: Note;
  review;
  faExternalLinkAlt = faExternalLinkAlt;
  faEnvelope = faEnvelope;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  note(note: Note) {
    this.review.reviewData$.subscribe(review => {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: { note, type: this.review.type, review, componentClass: CreateWhiteboardNoteFormComponent, title: 'Team Member' },
      });
      dialogRef.afterClosed().subscribe(data => {
        console.log('submitted', data);
      });
    });
  }

  /**
   * openObject is the function call for PAGE editting
   *
   * @param obj the object being opened in a new page for editting
   */
  openInPage(note: Note): void {
    console.log('Opening in new page', note);
    let objId = note ? note : null;
  }
}
