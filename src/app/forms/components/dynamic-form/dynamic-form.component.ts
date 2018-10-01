import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { FieldConfig, Validator } from "@forms/field.interface";

/**
 * The dynamic-form component generates forms by projecting field configuration items
 * that accept a FieldConfig into the dynamic-field directive tagged ng-template.
 * The dynamic-field directive has a factory that generates each form field tying them
 * together in a common form group (which is also passed into the directive). 
 * In addition to the dynamically built form fields there are two ng-content interpolation
 * points, header and footer. Each of these lie within the <form> tag and should be able 
 * to be tied into the form. Typical useage of the footer is as placement for button(s) to
 * submit the form or handle alternate actions (close without saving, cancel, etc.)
 */
@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  /**
   * The arra of FieldConfigs is a set of questions/fields that follow the FieldConfig interface.
   * The fields are components are built using Angular Materials and many are not completely
   * configured to utilize all the available settings. Nor do all of them have uses for all the 
   * values available in the FieldConfig interface. For details on how to use them, please reference
   * the FieldConfig interface and the field component that you'd like to use. Some Angular Material 
   * specific values are set statically at the component level. Others allow for these to be set via
   * the matConfig key in the FieldConfig interface. See it for details.
   */
  @Input() fields: FieldConfig[] = [];

  // This is used to emmit the form on submit
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  // This is used to emmit the form on changes
  @Output() onFormChanges: EventEmitter<any> = new EventEmitter<any>();

  autocompletes: string[] = [];

  form: FormGroup;

  get value() {
    return this.form.value;
  }

  constructor(private fb: FormBuilder) { }

  // create a new form on init
  ngOnInit() {
    this.form = this.createControl();
    /**
     * Here, we subscribe to the form's valueChanges observable to emit the form on changes.
     * This is especially useful for forms that use value based criteria to present the user
     * with an endpoint tied list of filtered autocomplete options. See AutocompleteComponent
     * for an example. Chips could also be configured like Autocomplete is as of the writing of
     * this comment.
     */
    this.form.valueChanges.subscribe(form => this.onFormChanges.emit(form))
  }

  // on the click of a submit button, the form is emitted if valid.
  onSubmit(event: Event) {
    let submitForm = this.form.value;
    console.log('SUBMITTED!');
    event.preventDefault();
    /** 
     * because of the way displayWith on Materials Autocomplete works (see https://github.com/angular/material2/issues/8436) it doesn't return what was passed as the Option.value,
     * instead it returns the entire Option item. Until submit is clicked, any handling means overwriting the existing value and making the displayWith value affected. It is handled 
     * here until the Angular team changes how this is handled.
     */
    this.autocompletes.forEach(autocomplete => {
      submitForm = {
        ...this.form.value,
        ...this.form.value[autocomplete].value,
      }
      delete submitForm[autocomplete];
    });
    console.log('submitForm', submitForm);
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(submitForm);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  /** 
   * With the exception of button, each FieldConfig is added to the formbuilder group
   * and returned as the generated form 
   */

  createControl() {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      if (field.type === 'button') return;
      if (field.type === 'autocomplete') {
        this.autocompletes.push(field.name);
      }
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  /**
   * @param validations
   * Each of the validation settings (set as an array as part of a FieldConfig) is 
   * combined via the compose() function and returned to be set as part of the createControl()
   * function that builds the form.
   */
  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  /**
   * 
   * @param formGroup 
   * If the form is not valid on submit, validate all form field setting each as touched to ensure 
   * any required validation messages are triggered.
   */
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
