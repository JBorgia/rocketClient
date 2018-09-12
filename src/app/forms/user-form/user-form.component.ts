import { Component, Input, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ArsUser, Org, UserType, VehicleSystem, Role, Supplier } from '@app/models/ars-app.models';
import { UserAPI, SupplierLkupAPI } from '@app/services';
import { ModalComponent } from '@components/modal/modal.component';
import { of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../field.interface';

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"]
})
export class UserFormComponent {
  @Input() data: any;
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  title = "Add ARS User";
  regConfig: FieldConfig[];
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private userAPI: UserAPI,
    private supplierLkupAPI: SupplierLkupAPI,
  ) { }

  ngOnInit() {
    this.regConfig = [
      {
        type: "input",
        label: "First Name",
        inputType: "text",
        name: "firstName",
        value: this.data.employee.firstName,
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
        label: "Last Name",
        inputType: "text",
        name: "lastName",
        value: this.data.employee.lastName,
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
        type: "select",
        label: "Organization",
        name: "org",
        value: '',
        options: this.userAPI.getOrganizations().pipe(
          map((orgs: Org[]) => { return orgs.map(org => ({ name: org.orgName, value: org })) })
        )
      },
      {
        type: "select",
        label: "Type",
        name: "type",
        value: '',
        options: this.userAPI.getTypes().pipe(
          map((types: UserType[]) => { return types.map(type => ({ name: type.userType, value: type })) })
        )
      },
      {
        type: "select",
        label: "Role",
        name: "role",
        value: '',
        options: this.userAPI.getRoles().pipe(
          map((roles: Role[]) => { return roles.map(role => ({ name: role.roleName, value: role })) })
        )
      },
      {
        type: "autocomplete",
        label: "Supplier",
        name: "supplier",
        value: '',
        options: of([]),
        miscConfig: {
          minSearchLength: 2,
          debounceTime: 400,
        }
      },
      {
        type: "select",
        label: "Technology",
        name: "technology",
        value: { name: "Avionics", value: "Avionics" },
        options: this.userAPI.getTechnologies().pipe(
          map((technologies: VehicleSystem[]) => { return technologies.map(tech => ({ name: tech.vehicleSystem, value: tech })) })
        )
      },
      // {
      //   type: "textarea",
      //   label: "User Summary",
      //   inputType: "text",
      //   name: "user_summary",
      //   value: "",
      //   validations: [
      //     {
      //       name: "required",
      //       validator: Validators.required,
      //       message: "User Summary Required"
      //     }
      //   ]
      // },
      // {
      //   type: "chips",
      //   label: "Supervisors",
      //   name: "supervisors",
      //   value: "",
      //   options: of(['Borgia', 'Negou', 'Vinh'].map(option => ({ name: option }))),
      //   validations: [
      //     {
      //       name: "required",
      //       validator: Validators.required,
      //       message: "User Supervisor Required"
      //     }
      //   ]
      // },
      // {
      //   type: "radiobutton",
      //   label: "Gender",
      //   name: "gender",
      //   value: { name: "Male", value: "Male" },
      //   options: of(["Male", "Female"].map(option => ({ name: option }))),
      // },
      // {
      //   type: "date",
      //   label: "DOB",
      //   name: "dob",
      //   value: "",
      //   validations: [
      //     {
      //       name: "required",
      //       validator: Validators.required,
      //       message: "Date of Birth Required"
      //     }
      //   ]
      // },
      // {
      //   type: "select",
      //   label: "Country",
      //   name: "country",
      //   value: "US",
      //   options: of(["India", "UAE", "UK", "US"].map(option => ({ name: option })))
      // },
      // {
      //   type: "checkbox",
      //   label: "Admin",
      //   name: "admin",
      //   value: true
      // },
    ];

  }


  onFormChanges(value: any) {
    if (typeof value.supplier === 'string') {
      console.log('OnFormChanges', value.supplier);
      this.regConfig[5].options = this.supplierLkupAPI.getAllActiveWithName(value.supplier).pipe(
        map((suppliers: Supplier[]) => { return suppliers.map(supplier => ({ name: supplier.supplierName, value: supplier })) })
      )
    }
  }

  get class() {
    return this;
  }

  submit(value: any) {
    this.data.teamData$.pipe(
      take(1),
      map((members: ArsUser[]) => {
        // Get assignedTo member and populate assignedTo fields
        // let newUser = members.find(member => member.userId === value.newUserUser);
        // value.firstName = newUser.firstName;
        // value.newUserLastName = newUser.lastName;

        value.userId = this.data.user.userId,
        value.firstName = this.data.user.firstName;
        value.lastName = this.data.user.lastName;
        value.company = this.data.user.company;
        value.team = this.data.user.team;
        value.technology = this.data.user.technology;

        return value;
      }),
      switchMap(this.userAPI.saveUser)
    ).subscribe(res => {
      console.log('response:', res);
      this.dialogRef.close(res);
    });
  }

}

