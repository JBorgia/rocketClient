import { Component, OnInit, Input } from '@angular/core';
import { ArsUser } from '@app/models/ars-app.models';

import {
  faExternalLinkAlt,
  faEnvelope,
  faUserMinus,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CreateMessageFormComponent } from '@app/forms';
import { ModalComponent } from '@app/components/modal/modal.component';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  item: ArsUser;
  review;
  faExternalLinkAlt = faExternalLinkAlt;
  faEnvelope = faEnvelope;
  faUserMinus = faUserMinus;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    console.log('User Item Review:', this.review)
  }

  message(user: ArsUser) {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: { user, review: this.review, componentClass: CreateMessageFormComponent, title: 'Team Member' },
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
  openInPage(user: ArsUser): void {
    console.log('Opening in new page', user);
    let objId = user ? user.userId : null;
  }
}
