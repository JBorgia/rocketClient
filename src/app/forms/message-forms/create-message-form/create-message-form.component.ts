import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ModalComponent } from '@app/components/modal/modal.component';
import { ModalInterface } from '@components/modal/modal.interface';
import { of, Observable } from 'rxjs';

import { DynamicFormComponent } from '@forms/components/dynamic-form/dynamic-form.component';
import { FieldConfig } from '@forms/field.interface';
import { UserAPI } from '@app/services';
import { map } from 'rxjs/operators';
import { ArsUser } from '@app/models/ars-app.models';
import { VsReview } from '@app/pages/dynamic/vs-display/vs-data-object';

// Need to create messaging table and associated endpoint service


@Component({
  selector: "app-create-message-form",
  templateUrl: "./create-message-form.component.html",
  styleUrls: ["./create-message-form.component.scss"]
})


export class CreateMessageFormComponent implements OnInit, ModalInterface {
  @Input() data: any;
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  reviewName;
  regConfig: FieldConfig[];

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private userAPI: UserAPI,
  ) { }

  submit(value: any) {
    console.log('EMMITTING VALUE: ', value);
    this.dialogRef.close(value);
  }

  /**
   * Forms are made by passing an array of FieldConfig objects to the DynamicFormComponent on the fields input.
   * If necessary, the generated form can be accessed via the ViewChild referenced 'form'
   * The data input recieves any relevant data from the component that is instantiating CreateMessageFormComponent.
   * In this case, part, user, and team data are all included in data.
   */

  ngOnInit() {
    this.regConfig = [
      {
        type: "input",
        label: "Subject",
        inputType: "text",
        name: "subject",
        value: '',
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "Subject required"
          },
        ]
      },
      {
        type: "chips",
        label: "Recipients",
        name: "recipients",
        value: this.assignRecipient(),
        options: this.assignOptions(),
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "At least one recipient required"
          }
        ]
      },
      {
        type: "textarea",
        label: "Message",
        inputType: "text",
        name: "message",
        value: "",
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "Message body required"
          }
        ],
        matConfig: {
          cdkAutosizeMinRows: "2",
          cdkAutosizeMaxRows: "7"
        }
      },
    ];

    this.assignSubject();
  }

  assignSubject() {
    if(!this.data.review){
      return;
    }
    const vsReview: VsReview = this.data.review;
    vsReview.reviewData$.subscribe(review => {
      switch (this.data.review.type) {
        case 'part':
          this.form.form.patchValue({ subject: `Part ${review.partNo} | Serial ${review.serialNo}` });
          break;
        case 'document':
          this.form.form.patchValue({ subject: `File ${review.docFilename} | ID ${review.documentId}` });
          break;
        case 'eid':
          this.form.form.patchValue({ subject: `Once built, add EID model information name here.` });
          break;
        default:
          console.error('No type recieved. Please check data mapping.')
      }
    });
  }

  assignRecipient() {
    return this.data.user ? [{ name: `${this.data.user.lastName}, ${this.data.user.firstName}`, value: this.data.user }] : ''
  }

  assignOptions(): Observable<any> {
    if (this.data.review) {
      return this.userAPI.getUsersByPart(this.data.review.id).pipe(
        map((members: ArsUser[]) => { return members.map(member => ({ name: `${member.lastName}, ${member.firstName}`, value: member })) }));
    } else {
      return this.userAPI.getAll().pipe(
        map((members: ArsUser[]) => { return members.map(member => ({ name: `${member.lastName}, ${member.firstName}`, value: member })) }));
    }
  }

  get class() {
    return this;
  }
}
