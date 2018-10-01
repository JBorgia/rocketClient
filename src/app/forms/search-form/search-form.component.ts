import { Component, Input, ViewChild } from '@angular/core';
import { SupplierLkupAPI } from '@services/index';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { DynamicFormComponent } from '@forms/components/dynamic-form/dynamic-form.component';
import { FieldConfig } from '@forms/field.interface';
import { Supplier } from '@app/models/ars-app.models';

/**
 * Forms are made by passing an array of FieldConfig objects to the DynamicFormComponent on the fields input.
 * If necessary, the generated form can be accessed via the ViewChild referenced 'form'
 * The data input recieves any relevant data from the component that is instantiating SearchPartsFormComponent.
 */

 /**
  * The select employee form is a precursor to the add new ARS user form. It is a single autocomplete that returns a list of users
  * matching the search/filter string. A user is then selected and on submittion, passed to the ARS user form were his/her information
  * helps to prepopulate the form.
  */

@Component({
  selector: "app-search-form",
  templateUrl: "./search-form.component.html",
  styleUrls: ["./search-form.component.scss"]
})


export class SearchFormComponent {
  // Any data the form needs to be built is passed to it via the data variable.
  @Input() data: any;
  // The DynamicFormComponent is imported and tied to using @ViewChild to gain access to the form
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  // The DynamicFromComponent requires an array of FieldConfi class items to build itself
  regConfig: FieldConfig[];
  // the title of the form
  title = "Search";

  constructor(
    private supplierLkupAPI: SupplierLkupAPI,
  ) { }
/**
   	private String supplierName;
    private String partName;
    private String partNo;
    private String serialNo;
    private String lotNo;
    private String missionName;
 */
  ngOnInit() {
    this.regConfig = [
      {
        type: "autocomplete",
        label: "Supplier",
        name: "supplierName",
        value: "",
        options: of([]),
        miscConfig: {
          minSearchLength: 2,
          debounceTime: 400,
        }

      },
      {
        type: "input",
        label: "Part Name",
        name: "partName",
        value: "",
        inputType: 'text',
      },
      {
        type: "input",
        label: "Part No.",
        name: "partNo",
        value: "",
        inputType: 'text',
      },
      {
        type: "input",
        label: "Serial No.",
        name: "serialNo",
        value: "",
        inputType: 'text',
      },
      {
        type: "input",
        label: "Lot No.",
        name: "lotNo",
        value: "",
        inputType: 'text',
      },
      {
        type: "select",
        label: "Misson",
        name: "missionName",
        value: "",
        options: of([]),

      },
    ];
  }

  submit(value: any) {
    console.log('Sending this dude to Create ARS User Form!', value);
  }

  onFormChanges(value: any) {
    if (typeof value.supplierName === 'string') {
      console.log('OnFormChanges', value.supplierName);
      this.regConfig[0].options = this.supplierLkupAPI.getAllActiveWithName(value.supplierName).pipe(
        map((suppliers: Supplier[]) => { return suppliers.map(supplier => ({ name: supplier.supplierName, value: supplier })) })
      )
    }
  }
}

