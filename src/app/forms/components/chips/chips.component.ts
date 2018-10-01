import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { FormGroup } from "@angular/forms";
import { FieldConfig, Option } from "@forms/field.interface";
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * @title Chips Autocomplete
 * The chips component is a bit more complex as it is a combination of an autocomplete
 * input field and a series of 'chips' that have additional fuctionality attached as they
 * can be removed.
 *  
 * Example of a chips config object initialized to a FieldConfig[]
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
        type: "chips",
        label: "Supervisors",
        name: "supervisors",
        options: ['Borgia', 'Negou', 'Vinh'].map(option => ({ name: option })),
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "User Supervisor Required"
          }
        ]
      },
    ];
 * 
 * 
 * 
    this.regConfig: FieldConfig[] = [
      {
        type: "chips",
        label: "Supervisors",
        name: "supervisors",
        options: ['Borgia', 'Negou', 'Vinh'].map(option => ({ name: option })),
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "User Supervisor Required"
          }
        ]
      },
    ];
 */


@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent implements OnInit {
  /** 
   * field holds the settings passed to it from the dynamic-field directive.
   * These settings are used to set the values, styling, and functionality of the
   * ChipComponent
   */
  field: FieldConfig;
  /**
   * group is passed from the dynamic-field directive. It ties the ChipComonent back
   * to the DynamicForm Component form group
   */
  group: FormGroup;

  /** 
   * the ars_app uses font awesome fonts. The one here is used for the remove button in the chip(s)
   */
  faIcon = faTimesCircle;

  /** 
   * mat-chip can be selectable, this sets that value
   */
  selectable = true;

  /** 
   * mat-chip can be removable, this sets that value. All are currently removable, but if some
   * values are ever populated automatically, it would be a good idea to modify this so those can
   * be made to not be removable as they are system set and included values.
   */
  removable = true;

  /**
   * controls when the add even is fired for adding a chip. Here, we are adding on click, so this
   * is dissabled. 
   */
  addOnBlur = false;

  /**
   * text input for mat allows for multiple items to be set using divider keycodes. These are the 
   * keycodes set as separators
   */
  separatorKeysCodes: number[] = [ENTER, COMMA];

  /**
   * this FormControl is tied to the input and is used to track changes. These changes are filtered
   * on the fly by _filter()
   */
  formCtrl = new FormControl();

  /**
   * filteredOptions is updated by _filter() with a short list of results that match the criteria 
   * in formCtrl
   */
  filteredOptions: Observable<Option[]>;

  /**
   * Options are removed from unselectedOptions as they are added to the selected chips (those added
   * to the this.field.value array of name & value objects). unselectedOptions holds an array of
   * available Option objects not yet selected.
   */
  unselectedOptions: Option[];

  /**
   * optionInput is bonded to the html element and is used to clear the autocomplete input field
   */
  @ViewChild('optionInput') optionInput: ElementRef;

  /**
   * On construction filteredOptions is set to an array returned by the _filter(), or, if no value 
   * is yet entered for the formCtrl field (the autocomplete input field), the unfiltered list of
   * unselectedOptions is returned instead.
   */
  constructor() {
    this.filteredOptions = this.formCtrl.valueChanges.pipe(
      startWith(null),
      map((inputValue: string | null) => inputValue ? this._filter(inputValue) : this.unselectedOptions));
  }

  /**
   * On Initialization, the unselected options are set from the total options and any set values (pulled from
   * the this.field.value array of preset selected values) are removed from unselectedOptions.
   */
  ngOnInit(): void {
    this.field.options.subscribe(res => {
      this.unselectedOptions = res;

      // Remove already selected values from selectable options
      if (this.field.value) {
        this.field.value.forEach(value => {
          let index = this.unselectedOptions.map((option: Option) => option.name).indexOf(value.name);
          this.unselectedOptions.splice(index, 1);
        });
      }
      this.formCtrl.setValue('');
    });
  }

  /**
   * 
   * @param event: event from input filed on enter click
   * The add() function is triggered when a user clicks the enter key after filling out the input field
   */
  add(event: MatChipInputEvent): void {
    // input holds the actual input field for clearing later
    const input = event.input;
    // value is set to the current event value. toLowerCase is used to ensure a case insensitive match
    const value = event.value.toLowerCase();
    const index = this.unselectedOptions.map((option: Option) => option.name.toLowerCase()).indexOf(value);

    // Short circuit if value isn't in unselectedOptions
    if (index === -1) {
      return;
    }

    // Add our option
    if ((value || '').trim()) {
      // Rather than use the value (which could be any case) grab the value from those provided using the matched index.
      this.field.value.push(this.unselectedOptions[index]);
      this.unselectedOptions.splice(index, 1);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    // ensure formcontrol is cleared, thus clearing the _filter
    this.formCtrl.setValue(null);
  }


  /**
   * 
   * @param option 
   * Removes a chip if removable. As the option is pulled from the chip itself (which is set from the actual
   * array of values passed from field.options), case insensitive checking isn't necessary
   */
  remove(option: Option): void {
    const index = this.field.value.indexOf(option);
    this.unselectedOptions.push(option);

    if (index >= 0) {
      this.field.value.splice(index, 1);
    }
    this.formCtrl.reset();
  }


  /**
   * 
   * @param event 
   * When a user selects an autocomplete option, the selected() runs instead of the add().
   * The 
   */
  selected(event: MatAutocompleteSelectedEvent): void {
    /** 
     * here, toLowerCase() is more of a sanity check. The option.viewValue should be fine
     * as a case sensitive match since it is selected from a field.options generated list
     * of values.
     */
    const value = event.option.viewValue.toLowerCase();
    const index = this.unselectedOptions.map((option: Option) => option.name.toLowerCase()).indexOf(value);
    this.field.value.push(this.unselectedOptions[index]);
    this.unselectedOptions.splice(index, 1);
    this.optionInput.nativeElement.value = '';
    this.formCtrl.setValue(null);
  }

  private _filter(inputValue: string): Option[] {
    /**
     * Here, toString() is used as when selected(), the inputValue field will be set to the Option value momentarily
     * by the Material matAutocomplete function. As this only happens on select, it would cost more to fix it than to 
     * simply avoid the issue. A case insensitive filter is used to ensure that values are displayed even if the user
     * doesn't type the correct case.
     */
    const filterValue = inputValue.toString().toLowerCase();

    return this.unselectedOptions.filter(option => option.name.toLowerCase().indexOf(filterValue) !== -1);
  }
}
