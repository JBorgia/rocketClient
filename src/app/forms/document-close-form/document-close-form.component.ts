import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { ArsUser } from '@app/models/ars-app.models';
import { DocumentAPI } from '@app/services';
import { map, take } from 'rxjs/operators';

import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../field.interface';

@Component({
  selector: 'app-document-close-form',
  templateUrl: './document-close-form.component.html',
  styleUrls: ['./document-close-form.component.scss']
})
export class DocumentCloseFormComponent implements OnInit {
  @Input() data: any;
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  regConfig: FieldConfig[];

  constructor(
    private documentAPI: DocumentAPI
  ) { }



  ngOnInit() {
    this.regConfig = [
      {
        type: "checkbox",
        label: "Complete",
        name: "docStatus",
        value: false
      },
      {
        type: "textarea",
        label: "Document Comments",
        inputType: "text",
        name: "note",
        value: "",
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "Document Comments required"
          }
        ]
      },
    ];
  }

  // submit(value: any) {
  //   console.log('EMMITTING VALUE: ', value);
  // }
  submit(value: any) {
    this.data.teamData$.pipe(
      take(1),
      map((members: ArsUser[]) => {
        // Get docSignerName member and populate docSignerName fields
        let docSignerName = members.find(member => member.userId === value.docSignerNameUser);
        value.docSignerNameFirstName = docSignerName.firstName;
        value.docSignerNameLastName = docSignerName.lastName;

        value.docSignedRole = this.data.docSignedRole;
        value.docSignedDate = this.data.docSignedDate;
        value.docSignerNote = this.data.docSignerNote

        return value;
      })
    ).subscribe(this.documentAPI.saveDocument);
  }

}
