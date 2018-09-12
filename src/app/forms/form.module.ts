import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderObjectByPipeModule } from '@pipes/order-object-by.pipe';
import { SortArrayModule } from '@pipes/sort-array.pipe';

import {
  DocumentCloseFormComponent,
  CreateMessageFormComponent,
  ReviewCloseFormComponent,
  SelectEmployeeFormComponent,
  SearchPartsFormComponent,
  UserFormComponent,
  WhiteboardIssueFormComponent,
} from '.';
import {
  AutocompleteComponent,
  ButtonComponent,
  CheckboxComponent,
  ChipsComponent,
  DateComponent,
  InputComponent,
  RadiobuttonComponent,
  SelectComponent,
  TextareaComponent,
} from './components';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    // FORMS
    UserFormComponent,
    CreateMessageFormComponent,
    WhiteboardIssueFormComponent,
    SelectEmployeeFormComponent,
    SearchPartsFormComponent,
    ReviewCloseFormComponent,
    DocumentCloseFormComponent,
    
    // FORM COMPONENTS
    AutocompleteComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    TextareaComponent,
    ChipsComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    ReviewCloseFormComponent,
    DocumentCloseFormComponent,
  ],
  imports: [
    SortArrayModule,
    FontAwesomeModule,
    CommonModule,
    MaterialModule,
    OrderObjectByPipeModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  /**
   * If a new field interface component is to be added to the list for transclusion inside the DynamicFormComponent/DynamicComponentDirective,
   * it must be imported here and added to the list of entryComponents for the FormModule.
   */
  entryComponents: [
    AutocompleteComponent,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    ChipsComponent,
  ]
})
export class FormModule { }
