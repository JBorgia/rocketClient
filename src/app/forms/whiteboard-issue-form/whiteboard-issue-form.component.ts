import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ArsUser } from '@app/models/ars-app.models';
import { WhiteboardIssueAPI } from '@app/services';
import { ModalComponent } from '@components/modal//modal.component';
import { map, switchMap } from 'rxjs/operators';

import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../field.interface';

@Component({
  selector: 'app-whiteboard-issue-form',
  templateUrl: './whiteboard-issue-form.component.html',
  styleUrls: ['./whiteboard-issue-form.component.scss']
})
export class WhiteboardIssueFormComponent implements OnInit {
  @Input() data: any;
  @Output() emitter: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  regConfig: FieldConfig[];

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private whiteboardIssueAPI: WhiteboardIssueAPI,
  ) { }

  ngOnInit() {
    this.regConfig = [
      {
        type: 'input',
        label: 'Title',
        inputType: 'text',
        name: 'title',
        value: this.data.wbTitle,
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
        label: 'Issue',
        name: 'category',
        value: 'Question/Clarification',
        options: this.whiteboardIssueAPI.getWbCategories().pipe(
          map((categories: any[]) => { return categories.map(category => ({ name: category.descr, value: category })) })
        )
      },
      {
        type: 'textarea',
        label: 'Requested action',
        inputType: 'text',
        name: 'action',
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
        type: 'select',
        label: 'Assigned to',
        name: 'assignedToUser',
        value: '',
        options: this.data.teamData$.pipe(
          map((members: ArsUser[]) => members.map(member => ({ name: `${member.lastName}, ${member.firstName}`, value: member.userId })))
        ),
      },
      {
        type: 'select',
        label: 'Status',
        name: 'status',
        value: { name: 'Open', value: 'Open' },
        options: this.whiteboardIssueAPI.getWbStatusOptions().pipe(
          map(statuses => { return statuses.map(status => ({ name: status.descr, value: status })) })
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
      }
    ];

  }

  /**
   * On submit, the associated data needs to be populated to conform to the requirements of the data model
   */
  submit(value: any) {
    this.data.teamData$.pipe(
      map((members: ArsUser[]) => {
        let whiteboardIssue = value;
        // Get assignedTo member and populate assignedTo fields
        let assignedTo = members.find(member => member.userId === value.assignedToUser);
        whiteboardIssue.assignedToFirstName = assignedTo.firstName;
        whiteboardIssue.assignedToLastName = assignedTo.lastName;

        // Populate fields for value of createdBy and lastUpdatedBy
        whiteboardIssue.createdByUser = this.data.currentUser.userId;
        whiteboardIssue.createdByFirstName = this.data.currentUser.firstName;
        whiteboardIssue.createdByLastName = this.data.currentUser.lastName;
        whiteboardIssue.lastUpdatedByUser = this.data.currentUser.userId;
        whiteboardIssue.lastUpdatedByFirstName = this.data.currentUser.firstName;
        whiteboardIssue.lastUpdatedByLastName = this.data.currentUser.lastName;

        return whiteboardIssue;
      }),
      // after populating the data, switchMap jumps to the saveWhiteboardIssue HttpClient request
      switchMap(this.whiteboardIssueAPI.saveWhiteboardIssue)
      // the observable chain is subscribed to and the response is emitted on the closing of the modal
    ).subscribe(res => {
      console.log('Create Whiteboard Issue success response:', res);
      this.dialogRef.close(res);
    });

  }
}


