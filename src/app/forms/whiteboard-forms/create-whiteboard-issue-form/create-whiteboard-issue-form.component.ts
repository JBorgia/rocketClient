import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ArsUser, WhiteboardStatusLkup, WhiteboardIssue } from '@app/models/ars-app.models';
import { WhiteboardIssueAPI } from '@app/services';
import { ModalComponent } from '@components/modal/modal.component';
import { map, switchMap, take } from 'rxjs/operators';

import { DynamicFormComponent } from '@forms/components/dynamic-form/dynamic-form.component';
import { FieldConfig } from '@forms/field.interface';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-create-whiteboard-issue-form',
  templateUrl: './create-whiteboard-issue-form.component.html',
  styleUrls: ['./create-whiteboard-issue-form.component.scss']
})
export class CreateWhiteboardIssueFormComponent implements OnInit {
  // Any data the form needs to be built is passed to it via the data variable. Typical useage is for forms in modals.
  @Input() data;
  @Output() emitter: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  regConfig: FieldConfig[];
  review;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private whiteboardIssueAPI: WhiteboardIssueAPI,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.data.review.reviewData$.subscribe(review => {
      this.review = review;
    });

    this.regConfig = [
      {
        type: 'input',
        label: 'Title',
        inputType: 'text',
        name: 'title',
        value: '',
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'Title required'
          },
        ]
      },
      {
        type: 'select',
        label: 'Category',
        name: 'category',
        value: 'Question/Clarification',
        options: this.whiteboardIssueAPI.getWbCategories().pipe(
          map((categories: any[]) => { return categories.map(category => ({ name: category.descr, value: category })) })
        )
      },
      {
        type: 'textarea',
        label: 'Issue description',
        inputType: 'text',
        name: 'descr',
        value: '',
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'Whiteboard Summary Required'
          }
        ]
      },
      {
        type: 'textarea',
        label: 'Request',
        inputType: 'text',
        name: 'action',
        value: '',
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'Request Required'
          }
        ]
      },
      {
        type: 'select',
        label: 'Assigned to',
        name: 'assignedToUser',
        value: { name: '', value: {} },
        options: this.data.review.teamData$.pipe(
          map((members: ArsUser[]) => { return members.map(member => ({ name: `${member.lastName}, ${member.firstName}`, value: member })) })
        ),
      },
      {
        type: 'select',
        label: 'Status',
        name: 'status',
        value: { statusId: 'Open', descr: 'Open' } as WhiteboardStatusLkup,
        options: this.whiteboardIssueAPI.getWbStatusOptions().pipe(
          map(statuses => { return statuses.map(status => ({ name: status.descr, value: status })) })
        )
      },
    ];
  }

  /**
   * On submit, the associated data needs to be populated to conform to the requirements of the data model
   */
  submit(value: any) {
    console.log('VALUE', value);
    /**
     * Here, we are going to 'complete' the new WhiteboardIssue.
     * Typically, we would just get the data we want back from the form. But as of the time of this comment
     * WhiteboardIssue did not have a foreign key association to the assigned user. Instead, each of the 
     * assignedTo_______ fields held values in the database. The form assigns the whole user to the field
     * 'assignedToUser' - So here, we take the values and assign them to whiteboardIssue, overwritting the initially
     * set assignedToUser value with the userId as we go along. The {...value} is used to set by value rather
     * than reference and preserve the values in the parameter 'value'.
     * 
     * Much of the thought process here, database structure-wise, is that should the user be updated or deleted,
     * decoupling the tables would preserve data accuracy. This may change in the future.
     * 
     */
    const currentUser = this.authenticationService.currentUserArsData;
    let whiteboardIssue: WhiteboardIssue = { ...value };
    // Get assignedTo member and populate assignedTo fields.
    whiteboardIssue.assignedToUser = value.assignedToUser.userId;
    whiteboardIssue.assignedToFirstName = value.assignedToUser.firstName;
    whiteboardIssue.assignedToLastName = value.assignedToUser.lastName;

    // // Populate fields for value of createdBy and lastUpdatedBy
    whiteboardIssue.createdByUser = currentUser.userId;
    whiteboardIssue.createdByFirstName = currentUser.firstName;
    whiteboardIssue.createdByLastName = currentUser.lastName;
    whiteboardIssue.lastUpdatedByUser = currentUser.userId;
    whiteboardIssue.lastUpdatedByFirstName = currentUser.firstName;
    whiteboardIssue.lastUpdatedByLastName = currentUser.lastName;
    whiteboardIssue.lastUpdatedOn = new Date();

    whiteboardIssue.part = this.review;

    // after populating the data, switchMap jumps to the saveWhiteboardIssue HttpClient request
    this.whiteboardIssueAPI.saveWhiteboardIssue(whiteboardIssue).subscribe(res => {
      console.log('Create Whiteboard Issue success response:', res);
      this.dialogRef.close(res);
    });

  }
}
