import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from "@forms/field.interface";
import { MatSelect } from '@angular/material';

/**
 * SelectComponent uses mat-select and settings may be statically set in the template.
 * Should any specialization be needed this component should be modified at that time to include
 * that functionality. This change should default to current functionality if the added FieldConfig
 * values are not set. 
 * 
 * Example of a radiobutton config object initialized to a FieldConfig[]
 * 
 * Note that the options array Option objects MUST have a 'name' but do not necessarily
 * require a 'value'. When to supplied, the value supplied for name can be used as the value,
 * however, when persisting the form, logic may be needed to fill in the values correctly.
 * 
 * Additionally, when updating the logic in Chips, Select, Radiobutton, or any array options
 * form field, the logic should be written around name and not value.
 * 
    this.regConfig: FieldConfig[] = [
      {
        type: 'select',
        label: 'Company',
        name: 'company',
        value: {name: 'company 1'},
        options: ['company 1', 'company 2', 'company 3', 'company 4', 'company 5'].map(option => ({ name: option }))
      },
      {
        type: 'select',
        label: 'Team',
        name: 'team',
        value: '', // NOTE: value has to exist for there to be something to set the values to. If blank, use a blank string
        options: ['Team 1', 'team 2', 'team 3', 'team 4', 'team 5'].map(option => ({ name: option }))
      },
      {
        type: 'select',
        label: 'Technology',
        name: 'technology',
        value: {name: 'Avionics', value: 'Avionics'},
        options: ['Avionics', 'Engines and Motors', 'Ordnance', 'Propulsion', 'Structures'].map(option => ({ name: option, value: option }))
      },
    ];
 *
 * Alternatively, the list could be built out from an array using map().
 *  
    this.regConfig: FieldConfig[] = [
      {
        type: 'select',
        label: 'Gender',
        name: 'gender',
        options: ['Male', 'Female'].map(option => ({ name: option })),
        value: {name: 'Male', value: 'Male'}
      },
    ];
 *
 * Or, it could be done inside an OnInit using a database list of objects. This would also be done using map().
 * Here, our example takes an array of user objects and converts them into an Option objects array using the 
 * last and first name for 'name' and the userId for value. This is the best way to handle database objects
 * to ensure that the Id of the object will be available for relationship handling. It also avoids problems that 
 * could arrise in this particular case of multiple users sharing the same first and last name. 
 *  
    this.regConfig: FieldConfig[] = [
      {
        type: 'select',
        label: 'Gender',
        name: 'gender',
        options: arsUserData.map(user => ({ name: `${user.nameLast}, ${user.nameFirst}`, value: user.userId })),,
        value:  employee.userId
      },
    ];
 *  
 * IMPORTANT! The compareByValue() used to verify change is functional, but simple. The simplicity and speed come at
 * a cost. The value set to the 'value' property MUST be exactly that of the 'value' of the option. The value can even
 * be an Object, but the ORDER and VALUE of the fields of the object must EXACTLY and COMPLETELY align with the option object.
 *  
 */

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent implements OnInit {
  // @ViewChild() matSelect: MatSelect;
  field: FieldConfig;
  group: FormGroup;
  reverse: boolean;
  order: string;

  constructor(
  ) { }

  ngOnInit() {
    /**
     * https://angular.io/api/forms/FormControlName#use-with-ngmodel
     * To avoid mixing reactive and template-driven forms, we set the value reactively.
     */
    this.reverse = false;
    this.order = 'name';
  }

  compareFn: ((f1: any, f2: any) => boolean)|null = this.compareByValue;

  compareByValue(f1: any, f2: any) { 
    return f1 && f2 && JSON.stringify(f1) === JSON.stringify(f2); 
  }
}
