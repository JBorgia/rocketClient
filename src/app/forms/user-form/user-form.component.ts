import { Component, ViewChild } from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig } from "../field.interface";
import { DynamicFormComponent } from "../components/dynamic-form/dynamic-form.component";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"]
})
export class UserFormComponent {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Username",
      inputType: "text",
      name: "name",
      value: "Username",
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
    {
      type: "input",
      label: "Email Address",
      inputType: "email",
      name: "email",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Email Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
            "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
          ),
          message: "Invalid email"
        }
      ]
    },
    {
      type: "input",
      label: "Password",
      inputType: "password",
      name: "password",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Password Required"
        }
      ]
    },
    {
      type: "textarea",
      label: "User Summary",
      inputType: "text",
      name: "user_summary",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "User Summary Required"
        }
      ]
    },
    {
      type: "chips",
      label: "Supervisors",
      name: "supervisors",
      options: ['Borgia', 'Negou', 'Vinh'],
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "User Supervisor Required"
        }
      ]
    },
    {
      type: "radiobutton",
      label: "Gender",
      name: "gender",
      options: ["Male", "Female"],
      value: "Male"
    },
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
    {
      type: "select",
      label: "Country",
      name: "country",
      value: "US",
      options: ["India", "UAE", "UK", "US"]
    },
    {
      type: "checkbox",
      label: "Admin",
      name: "admin",
      value: true
    },
    // {
    //   type: "button",
    //   label: "Save"
    // }
  ];

  submit(value: any) {
    console.log('SUBMIT CLICKED!');
  }
}
