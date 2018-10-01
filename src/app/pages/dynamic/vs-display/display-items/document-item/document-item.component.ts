import { Component, OnInit, Input } from '@angular/core';
import { Document } from '@app/models/ars-app.models';

import {
  faExternalLinkAlt, faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CreateMessageFormComponent } from '@app/forms';
import { ModalComponent } from '@app/components/modal/modal.component';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.scss']
})
export class DocumentItemComponent implements OnInit {
  item: Document;
  review;
  faExternalLinkAlt = faExternalLinkAlt;
  faEnvelope = faEnvelope;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  message(document: Document) {
    this.review.reviewData$.subscribe(review => {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: { document, type: this.review.type, review, componentClass: CreateMessageFormComponent, title: 'Team Member' },
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
  openInPage(document: Document): void {
    console.log('Opening in new page', document);
    let objId = document ? document.documentId : null;
  }
}
