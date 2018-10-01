import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "@forms/field.interface";

/**
 * TextAreaComponent uses matInput on a textarea tag and while much of the settings are statically 
 * set in the template, there are those that are set during use via the matConfig value on FieldConfig.
 * Should any specialization be needed this component should be modified at that time to include
 * that functionality. This change should default to current functionality if the added FieldConfig
 * values are not set. 
 * 
 * Example of a input config object initialized to a FieldConfig[]
 * 
 * Note: the validations are set as an array. Some additional Materials specific configs are added to the
 * matConfig key on the FieldConfig interface, while others are set statically in the template.
 * 
    this.regConfig: FieldConfig[] = [
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
 */

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent implements OnInit {
    field: FieldConfig;
    group: FormGroup;
    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    constructor() { }

    ngOnInit() {
        this.autosize.resizeToFitContent(true);
    }

}