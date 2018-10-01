import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs/operators';

import { FieldConfig, Option } from "@forms/field.interface";
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';

/**
 * AutocompleteComponent uses matInput and much of the settings are statically set in the template.
 * Should any specialization be needed this component should be modified at that time to include
 * that functionality. This change should default to current functionality if the added FieldConfig
 * values are not set. 
 * 
 * Example of a input config object initialized to a FieldConfig[]
 * 
 * Note that the validations are set as an array. Also, as autocomplete can be passed an Observable that is 
 * tied to a HttpClient request, it may be necessary to debounce the text input field. Use the miscConfig
 * value in the FieldConfig object to declare these settings.
 * 
    this.regConfig: FieldConfig[] = [
      {
        type: "autocomplete",
        label: "First Name",
        inputType: "text",
        name: "name",
        value: "firstName",
        options:  this.userLkupAPI.getAllActiveWithName(value.employee).pipe(
          map((employees: any[]) => employees.map(employee => ({ name: `${employee.lastName}, ${employee.firstName} #${employee.userId}`, value: employee })))
        ),
        miscConfig: {
          minSearchLength: 2,
          debounceTime: 400,
        }
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
    ];
 */

export interface User {
  name: string;
}

/**
 * @title Display value autocomplete
 */
@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ['./autocomplete.component.scss']
})

export class AutocompleteComponent implements OnInit {
  @ViewChild(MatAutocomplete) autoComplete: MatAutocomplete;
  field: FieldConfig;
  group: FormGroup;
  reverse: boolean;
  order: string;
  constructor(
  ) { }
  // this.field.options: Observable<Option[]>;

  /**
   * filteredOptions is updated by _filter() with a short list of results that match the criteria 
   * in formCtrl
   */
  filteredOptions: Observable<Option[]>;
  arrayOfOptions: Option[];

  ngOnInit() {
    this.reverse = false;
    this.order = 'name';
    this.filteredOptions = this.group.get(this.field.name).valueChanges
      .pipe(
        startWith<string | any>(this.field.value),
        debounceTime(this.field.miscConfig.debounceTime),
        distinctUntilChanged(),
        filter(query => query.length >= this.field.miscConfig.minSearchLength),
        map(value => typeof value === 'string' ? value : value.name),
        switchMap(name => name ? this._filter(name) : this.field.options),
      // tap(value => console.log('FIELD:',value))
    );
  }

  onOptionSelected(selectedOption: MatAutocompleteSelectedEvent) {
    console.log('selectedOption.option.viewValue', selectedOption.option.value);
    console.log('this.group.get(this.field.name)', this.group.get(this.field.name))
    this.field.name = selectedOption.option.value.value;
  }

  displayFn(option: Option){
    console.log('option', option);
    return option.name;
  }

  private _filter(name: string): Observable<Option[]> {
    const filterValue = name.toLowerCase();
    // console.log('Filter value:', name);
    return this.field.options.pipe(
      map(options => options.filter(option => option.name.toLowerCase().indexOf(filterValue) !== -1)),
      tap(options => {
        this.arrayOfOptions = options;
        console.log('this.arrayOfOptions:', this.arrayOfOptions)
      })
    );
  }

}