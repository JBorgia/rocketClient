import { Component, OnInit, Input } from '@angular/core';
import { Message } from '@app/models/ars-app.models';

import {
  faExternalLinkAlt,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CreateMessageFormComponent } from '@app/forms';
import { ModalComponent } from '@app/components/modal/modal.component';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {
  item: Message;
  review;
  faExternalLinkAlt = faExternalLinkAlt;
  faEnvelope = faEnvelope;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  message(message: Message) {
    this.review.reviewData$.subscribe(review => {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: { message, type: this.review.type, review, componentClass: CreateMessageFormComponent, title: 'Team Member' },
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
  openInPage(message: Message): void {
    console.log('Opening in new page', message);
    let objId = message ? message : null;
  }
}
