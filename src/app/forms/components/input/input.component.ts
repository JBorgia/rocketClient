import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";

/**
 * InputComponent uses matInput and much of the settings are statically set in the template.
 * Should any specialization be needed this component should be modified at that time to include
 * that functionality. This change should default to current functionality if the added FieldConfig
 * values are not set. 
 * 
 * Example of a input config object initialized to a FieldConfig[]
 * 
 * Note that the validations are set as an array.
 * 
    this.regConfig: FieldConfig[] = [
      {
        type: "input",
        label: "First Name",
        inputType: "text",
        name: "name",
        value: "firstName",
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "Name Required"
          },
          {
            name: "pattern",
            validator: Validators.pattern("^[a-zA-Z]+$"),
            message: "Accept only text"
          }
        ]
      },
    ];
 */

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
