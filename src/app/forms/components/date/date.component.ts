import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";

/**
 * DateComponent uses mat-datepicker and much of the settings are statically set in the template.
 * Should any specialization be needed (for example, automatically initialize to today's date, presumably)
 * this component should be modified at that time to include that functionality. This change should default 
 * to current functionality if the added FieldConfig values are not set. 
 * 
 * Example of a date config object initialized to a FieldConfig[]
 * 
    this.regConfig: FieldConfig[] = [
      {
        type: "date",
        label: "DOB",
        name: "dob",
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "Date of Birth Required"
          }
        ]
      },
    ];
 */


@Component({
  selector: "app-date",
  templateUrl: "./date.component.html",
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
