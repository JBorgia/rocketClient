
import { Validators } from '@angular/forms';
import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ModalComponent } from '@components/modal/modal.component';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { UserLkupAPI } from '@services/index';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { DynamicFormComponent } from '@forms/components/dynamic-form/dynamic-form.component';
import { FieldConfig } from '@forms/field.interface';

/**
 * Forms are made by passing an array of FieldConfig objects to the DynamicFormComponent on the fields input.
 * If necessary, the generated form can be accessed via the ViewChild referenced 'form'
 * The data input recieves any relevant data from the component that is instantiating SelectEmployeeFormComponent.
 */

 /**
  * The select employee form is a precursor to the add new ARS user form. It is a single autocomplete that returns a list of users
  * matching the search/filter string. A user is then selected and on submittion, passed to the ARS user form were his/her information
  * helps to prepopulate the form.
  */

@Component({
  selector: "app-select-employee-form",
  templateUrl: "./select-employee-form.component.html",
  styleUrls: ["./select-employee-form.component.scss"]
})


export class SelectEmployeeFormComponent {
  // Any data the form needs to be built is passed to it via the data variable.
  @Input() data: any;
  // The DynamicFormComponent is imported and tied to using @ViewChild to gain access to the form
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  // The DynamicFromComponent requires an array of FieldConfi class items to build itself
  regConfig: FieldConfig[];
  // the title of the form
  title = "Select Employee";

  /**
   * this is the title and component for the add ARS user subform. Configuration for the Modal is the same
   * as in other implementations accross the application.
   */
  modalComponentTitle = 'Team Member';
  modalComponentClass = CreateUserFormComponent;
  

  constructor(
    private userLkupAPI: UserLkupAPI,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalComponent>,
  ) { }

  ngOnInit() {
    this.regConfig = [
      {
        type: "autocomplete",
        label: "Search/filter",
        name: "employee",
        value: "",
        // start out with an empty set of users
        options: of([]),
        miscConfig: {
          minSearchLength: 2,
          debounceTime: 400,
        },
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'Employee Selection Required'
          },
          {
            name: 'pattern',
            validator: Validators.pattern("^[A-Za-z]+, [A-Za-z]+ #\d+$"),
            message: 'Select From Dropdown'
          }
        ]
      },
    ];
  }

  submit(value: any) {
    this.openDialog(value);
    this.dialogRef.close();
  }

  /**
   * Here is an example of how to use the onFormChange emmitter setup in the DynamicFormComponent. Since
   * we want to present the user with a list of employees based on the search criteria entered in the 
   * AutocompleteComplete, we overwrite the options value of the FieldConfig value with the new HttpClient
   * response Observable.
   * As HttpClient automatically disconnects on completion, there is no need to worry about memory leaks 
   * when overwritting this.regConfig[0].options here.
   */
  onFormChanges(value: any) {
    if (typeof value.employee === 'string') {
      // this.regConfig[0] to get the first field on this form
      this.regConfig[0].options = this.userLkupAPI.getAllActiveWithName(value.employee)
        .pipe(
          // As we want to pass the entire employee object, that is what is set as the value here.
          map((employees: any[]) => employees.map(employee => ({ name: `${employee.lastName}, ${employee.firstName} #${employee.userId}`, value: employee })))
        )
    }
  }

  /** 
   * On submit of this select employee form, the data is passed to the CreateUserFormComponent where it is cleaned
   * up and used to populate whatever fields for which data was found.
   */

  openDialog(employee: {}) {
    const subModalDialogRef = this.dialog.open(ModalComponent, {
      data: { employee, componentClass: this.modalComponentClass, title: this.modalComponentTitle },
    });
    // the Modal instance's afterClosed observable is subscribed to if the information is needed. afterClose() uses complete() so unsubscribing is not necessary.
    subModalDialogRef.afterClosed().subscribe(data => {
      console.log('submitted', data);
    });
  }
}

