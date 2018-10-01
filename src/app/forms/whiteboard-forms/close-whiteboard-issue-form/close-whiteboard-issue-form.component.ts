import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { WhiteboardStatusLkup, WhiteboardIssue } from '@app/models/ars-app.models';
import { WhiteboardIssueAPI } from '@app/services';
import { ModalComponent } from '@components/modal/modal.component';
import { map } from 'rxjs/operators';

import { DynamicFormComponent } from '@forms/components/dynamic-form/dynamic-form.component';
import { FieldConfig } from '@forms/field.interface';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-close-whiteboard-issue-form',
  templateUrl: './close-whiteboard-issue-form.component.html',
  styleUrls: ['./close-whiteboard-issue-form.component.scss']
})
export class CloseWhiteboardIssueFormComponent implements OnInit {
  @Input() data;
  @Output() emitter: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  regConfig: FieldConfig[];
  review;
  title;

  // data: { whiteboard, type: this.review.type, review, componentClass: WhiteboardComponent, title: `Whiteboard ${this.item.issueId}` },

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private whiteboardIssueAPI: WhiteboardIssueAPI,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    console.log('close whiteboard data', this.data);




    this.regConfig = [
      {
        type: 'textarea',
        label: 'Response',
        inputType: 'text',
        name: 'response',
        value: this.data.whiteboard.response,
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'Response Required'
          }
        ],
        matConfig: {
          cdkAutosizeMinRows: "5",
          cdkAutosizeMaxRows: "5"
        }
      },
      {
        type: 'textarea',
        label: 'Closing Notes',
        inputType: 'text',
        name: 'closedComment',
        value: this.data.whiteboard.closedComment,
        matConfig: {
          cdkAutosizeMinRows: "5",
          cdkAutosizeMaxRows: "5"
        }
      },
      {
        type: 'select',
        label: 'Status',
        name: 'status',
        value: this.setStatus(),
        options: this.whiteboardIssueAPI.getWbStatusOptions().pipe(
          map(statuses => { return statuses.map(status => ({ name: status.descr, value: status })) })
        )
      },
    ];
  }

  setStatus(): WhiteboardStatusLkup {
    if(this.data.whiteboard.status.statusId === 'Closed'){
      this.title = 'Re-open';
      return { statusId: 'Open', descr: 'Open' } as WhiteboardStatusLkup
    } else {
      this.title = 'Close';
      return { statusId: 'Closed', descr: 'Closed' } as WhiteboardStatusLkup
    }
  }

  /**
  * On submit, the associated data needs to be populated to conform to the requirements of the data model
  */
  submit(value: any) {
    console.log('VALUE', value);
    const currentUser = this.authenticationService.currentUserArsData;
    let whiteboardIssue: WhiteboardIssue = { ...this.data.whiteboard };

    // Populate fields for value of createdBy and lastUpdatedBy
    whiteboardIssue.lastUpdatedByUser = currentUser.userId;
    whiteboardIssue.lastUpdatedByFirstName = currentUser.firstName;
    whiteboardIssue.lastUpdatedByLastName = currentUser.lastName;
    whiteboardIssue.lastUpdatedOn = new Date();
    whiteboardIssue.status = value.status;
    
    if(value.response && value.response.length > 0){
      whiteboardIssue.responseByUser = currentUser.userId;
      whiteboardIssue.responseByFirstName = currentUser.firstName;
      whiteboardIssue.responseByLastName = currentUser.lastName;
      whiteboardIssue.response = value.response;
    }

    if (value.status.statusId === 'Closed') {
      // Get closedBy member and populate closedBy fields.
      whiteboardIssue.closedByUser = currentUser.userId;
      whiteboardIssue.closedByFirstName = currentUser.firstName;
      whiteboardIssue.closedByLastName = currentUser.lastName;
      whiteboardIssue.closedOn = new Date();
      whiteboardIssue.closedComment = value.closedComment;
    } else if (value.status.statusId === 'Open') {
      delete whiteboardIssue.closedByUser;
      delete whiteboardIssue.closedByFirstName;
      delete whiteboardIssue.closedByLastName;
      delete whiteboardIssue.closedOn;
      delete whiteboardIssue.closedComment;
    }

    // whiteboardIssue.part = this.review;
    console.log('whiteboardIssue: ', whiteboardIssue);

    // updateWhiteboardIssue HttpClient request
     this.whiteboardIssueAPI.updateWhiteboardIssue(whiteboardIssue).subscribe(res => {
       console.log('Update Whiteboard Issue success response:', res);
       this.dialogRef.close(res);
     });

  }

}
