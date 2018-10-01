import { Component, Input, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ArsUser, Org, UserType, VehicleSystem, Role, Supplier } from '@app/models/ars-app.models';
import { UserAPI, SupplierLkupAPI } from '@app/services';
import { ModalComponent } from '@components/modal/modal.component';
import { of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { DynamicFormComponent } from '@forms/components/dynamic-form/dynamic-form.component';
import { FieldConfig } from '@forms/field.interface';

@Component({
  selector: "app-user-form",
  templateUrl: "./create-user-form.component.html",
  styleUrls: ["./create-user-form.component.scss"]
})
export class CreateUserFormComponent {
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
        value: { vehicleSystem: "Avionics", descr: null },
        options: this.userAPI.getTechnologies().pipe(
          map((technologies: VehicleSystem[]) => { return technologies.map(tech => ({ name: tech.vehicleSystem, value: tech })) })
        )
      },
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
    console.log('Create User Form Value: ', value);
    // this.data.teamData$.pipe(
    //   take(1),
    //   map((members: ArsUser[]) => {
    //     // Get assignedTo member and populate assignedTo fields

    //     value.userId = this.data.user.userId,
    //     value.firstName = this.data.user.firstName;
    //     value.lastName = this.data.user.lastName;
    //     value.company = this.data.user.company;
    //     value.team = this.data.user.team;
    //     value.technology = this.data.user.technology;

    //     return value;
    //   }),
    //   switchMap(this.userAPI.saveUser)
    // ).subscribe(res => {
    //   console.log('response:', res);
    //   this.dialogRef.close(res);
    // });
  }

}

