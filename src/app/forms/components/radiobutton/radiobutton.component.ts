import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from "@forms/field.interface";

/**
 * RadiobuttonComponent uses mat-radio-group and settings may be statically set in the template.
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
        type: 'radiobutton',
        label: 'Gender',
        name: 'gender',
        options: [{name: 'Male'}, { name: 'Female'}],
        value: {name: 'Male', value: 'Male'}
      },
    ];
 *
 * Alternatively, the list could be built out from an array using map().
 *  
    this.regConfig: FieldConfig[] = [
      {
        type: 'radiobutton',
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
        type: 'radiobutton',
        label: 'Gender',
        name: 'gender',
        options: arsUserData.map(user => ({ name: `${user.nameLast}, ${user.nameFirst}`, value: user.userId })),
        value: {name: `${employee.nameLast}, ${employee.nameFirst}`, value: employee.userId}
      },
    ];
 */

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss']
})

export class RadiobuttonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {
    this.group.get(this.field.name).setValue(this.field.value);
  }
}
