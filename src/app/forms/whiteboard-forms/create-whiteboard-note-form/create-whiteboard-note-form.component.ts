import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ModalComponent } from '@app/components/modal/modal.component';
import { of, Observable } from 'rxjs';

import { DynamicFormComponent } from '@forms/components/dynamic-form/dynamic-form.component';
import { FieldConfig } from '@forms/field.interface';
import { UserAPI, WhiteboardIssueAPI } from '@app/services';
import { map } from 'rxjs/operators';
import { ArsUser, WhiteboardNote, WhiteboardIssue } from '@app/models/ars-app.models';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: "app-create-whiteboard-note-form",
  templateUrl: "./create-whiteboard-note-form.component.html",
  styleUrls: ["./create-whiteboard-note-form.component.scss"]
})


export class CreateWhiteboardNoteFormComponent implements OnInit {
  @Input() data: any;
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  reviewName;
  regConfig: FieldConfig[];
  parentWhiteboard: WhiteboardIssue;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private userAPI: UserAPI,
    private whiteboardIssueAPI: WhiteboardIssueAPI,
    private authenticationService: AuthenticationService,
  ) { }

  /**
   * Forms are made by passing an array of FieldConfig objects to the DynamicFormComponent on the fields input.
   * If necessary, the generated form can be accessed via the ViewChild referenced 'form'
   * The data input recieves any relevant data from the component that is instantiating CreateMessageFormComponent.
   * In this case, part, user, and team data are all included in data.
   */

  ngOnInit() {
    console.log('CREATE NOTE FORM DATA', this.data)
    this.parentWhiteboard = this.data.vsObject.parent;

    this.regConfig = [
      {
        type: "textarea",
        label: "Note",
        inputType: "text",
        name: "note",
        value: "",
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "Message body required"
          }
        ],
        matConfig: {
          cdkAutosizeMinRows: "5",
          cdkAutosizeMaxRows: "7"
        }
      },
    ];

  }

  /**
  * On submit, the associated data needs to be populated to conform to the requirements of the data model
  */
  submit(value: any) {
    const now = new Date();

    let whiteboardNote = new WhiteboardNote(
      value.note,
      now,
      this.data.currentUser.userId,
      now,
      this.data.currentUser.userId,
    );

    
    whiteboardNote.whiteboardIssue = this.parentWhiteboard

    console.log('submitting new whiteboardNote: ', whiteboardNote);
    // updateWhiteboardIssue HttpClient request
    this.whiteboardIssueAPI.saveWhiteboardNote(whiteboardNote).subscribe(res => {
      console.log('Update Whiteboard Issue success response:', res);
      this.dialogRef.close(res);
    });
  }
}
