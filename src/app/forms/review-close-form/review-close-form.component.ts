import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ArsUser } from '@app/models/ars-app.models';
import { ReviewAPI } from '@app/services';
import { ModalComponent } from '@components/modal//modal.component';
import { map, take } from 'rxjs/operators';

import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../field.interface';

@Component({
  selector: 'app-review-close-form',
  templateUrl: './review-close-form.component.html',
  styleUrls: ['./review-close-form.component.scss']
})

export class ReviewCloseFormComponent implements OnInit {
  @Input() data: any;
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  regConfig: FieldConfig[];

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private reviewAPI: ReviewAPI,
  ) { }

 
  ngOnInit() {
    this.regConfig = [
      {
        type: "checkbox",
        label: "Complete",
        name: "reviewed",
        value: false
      },
      {
        type: "textarea",
        label: "Closing Comments",
        inputType: "text",
        name: "comments",
        value: "",
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "Closing Comments required"
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
    
        return value;
      })
    ).subscribe(this.reviewAPI.saveReview);
  }

}
