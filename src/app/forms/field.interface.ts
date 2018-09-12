import { Observable } from 'rxjs';

export interface Validator {
  name: string;
  validator: any;
  message: string;
}


/**
 * options in FieldConfig is used for select, chips, and radiobutton, and accepts
 * an array of objects that at least have a name value. Value is optional, but typically
 * should be used. For example, if a list of users, the name would hold the users names 
 * while the value would be the user database id.
 */
export interface Option{
  name: string;
  value?: any;
}


/**
 *  Angular Materials specific options should be set to the matConfig value.
 */

export interface FieldConfig {
  label?: string; // this is the what will be the label or placeholder for the field.
  name?: string; // this is the name of the field in the Angular form group. Must be unique.
  inputType?: string; // if an input, specifies the input type (password, number, text, etc)
  options?: Observable<Option[]>; // an observable array of options. Probably could have just been a regular array, but, oh well.
  type: string; // specifies to the formbuilder factory which field component to use. 
  value: any; // the initial value of the field.
  validations?: Validator[]; // an array of Angular validation objects  
  matConfig?: any; // configurations for individual Material components. See each component for settings information.
  miscConfig?: any; // other, non-Material configurations. See each component for settings information.
}
