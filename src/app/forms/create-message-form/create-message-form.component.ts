import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ModalComponent } from '@app/components/modal/modal.component';
import { ModalInterface } from '@components/modal/modal.interface';
import { of } from 'rxjs';

import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../field.interface';

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
  ){}

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
    switch (this.data.type) {
      case 'part':
        this.reviewName = `Part ${this.data.review.partNo} | Serial ${this.data.review.serialNo}`;
        break;
      case 'document':
        this.reviewName = `File ${this.data.review.docFilename} | ID ${this.data.review.documentId}`
        break;
      case 'eid':
        this.reviewName = `Once built, add EID model information name here.`
        break;
      default:
        console.error('No type recieved. Please check data mapping.')
    }

    this.regConfig = [
      {
        type: "input",
        label: "Subject",
        inputType: "text",
        name: "subject",
        value: this.reviewName,
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
        value: [{ name: `${this.data.user.lastName}, ${this.data.user.firstName}`, value: this.data.user.userId }],
        options: of(this.data.team.map(member => ({ name: `${member.lastName}, ${member.firstName}`, value: member.userId }))),
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
  }

  get class() {
    return this;
  }
}
