import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ArsUser } from '@app/models/ars-app.models';
import { ReviewAPI } from '@app/services';
import { ModalComponent } from '@components/modal//modal.component';
import { map, take } from 'rxjs/operators';

import { DynamicFormComponent } from '@forms/components/dynamic-form/dynamic-form.component';
import { FieldConfig } from '@forms/field.interface';

@Component({
  selector: 'app-close-review-form',
  templateUrl: './close-review-form.component.html',
  styleUrls: ['./close-review-form.component.scss']
})

export class CloseReviewFormComponent implements OnInit {
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
