import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "@forms/field.interface";

/**
 * This button is of type submit and can be included in the dynamic
 * building of forms. However, typically, it is recommended to add
 * the submit button as projected content with the footer selector
 */

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styles: []
})

export class ButtonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() { }
  ngOnInit() { }
}
