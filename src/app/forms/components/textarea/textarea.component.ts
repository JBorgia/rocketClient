import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ViewChild } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent {
    field: FieldConfig;
    group: FormGroup;
    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    constructor() { }

    OnInit() {
        this.autosize.resizeToFitContent(true);
    }

}