import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

import { UserFormComponent } from "./user-form/user-form.component";
import { MaterialModule } from "./material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "./components/input/input.component";
import { ButtonComponent } from "./components/button/button.component";
import { SelectComponent } from "./components/select/select.component";
import { DateComponent } from "./components/date/date.component";
import { RadiobuttonComponent } from "./components/radiobutton/radiobutton.component";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";
import { TextareaComponent } from './components/textarea/textarea.component'
import { DynamicFieldDirective } from "./components/dynamic-field/dynamic-field.directive";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";
import { ChipsComponent } from '@app/forms/components/chips/chips.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SortArrayModule } from '@pipes/sort-array.pipe';

@NgModule({
  declarations: [
    UserFormComponent,
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
  ],
  imports: [
    SortArrayModule,
    FontAwesomeModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  entryComponents: [
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
export class AppFormModule {}
