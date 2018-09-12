import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";

/**
 * The checkbox works pretty much like a regular checkbox
 * 
 * Example of a checkbox config object initialized to a FieldConfig[]
 * 
    this.regConfig: FieldConfig[] = [
      {
        type: "checkbox",
        label: "Admin",
        name: "admin",
        value: true
      },
    ];
 */

@Component({
  selector: "app-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ['./checkbox.component.scss']
})

export class CheckboxComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
