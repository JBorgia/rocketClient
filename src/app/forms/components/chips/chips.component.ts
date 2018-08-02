import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  reverse: false;
  faIcon = faTimesCircle;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  formCtrl = new FormControl();
  filteredOptions: Observable<string[]>;
  selectedOptions: string[] = [];
  unselectedOptions: string[];

  @ViewChild('optionInput') optionInput: ElementRef;

  constructor() {
    this.filteredOptions = this.formCtrl.valueChanges.pipe(
      startWith(null),
      map((option: string | null) => option ? this._filter(option) : this.unselectedOptions.sort()));
  }

  ngOnInit(): void {
    this.unselectedOptions = this.field.options.map(value => this.toProperCase(value).trim());
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = this.toProperCase(event.value);
    const index = this.unselectedOptions.indexOf(value);

    // Short circuit if value isn't in unselectedOptions
    if (index === -1) {
      return;
    }

    // Add our option
    if ((value || '').trim()) {
      this.selectedOptions.push(value.trim());
      this.unselectedOptions.splice(index, 1);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.formCtrl.setValue(null);
  }

  toProperCase(value: string) {
    return value.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  };

  remove(option: string): void {
    const index = this.selectedOptions.indexOf(option);
    this.unselectedOptions.push(option);

    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    }
    this.formCtrl.reset();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedOptions.push(event.option.viewValue);
    this.unselectedOptions.splice(this.unselectedOptions.indexOf(event.option.viewValue), 1);
    this.optionInput.nativeElement.value = '';
    this.formCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.unselectedOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
