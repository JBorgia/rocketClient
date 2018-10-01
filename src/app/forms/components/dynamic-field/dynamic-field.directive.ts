import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "@forms/field.interface";
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { SelectComponent } from "../select/select.component";
import { DateComponent } from "../date/date.component";
import { RadiobuttonComponent } from "../radiobutton/radiobutton.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { TextareaComponent } from "../textarea/textarea.component";
import { ChipsComponent } from "../chips/chips.component"
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';

/**
 * The DinamicFieldDirective is where the actual factory pattern is implemented
 */

const componentMapper = {
  autocomplete: AutocompleteComponent,
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent,
  textarea: TextareaComponent,
  chips: ChipsComponent,
};

@Directive({
  selector: "[dynamicField]"
})
export class DynamicFieldDirective implements OnInit {
  /**
   * The FieldConfig contains the instructions on which type of field component 
   * should be generated and what settings should be used
   */
  @Input() field: FieldConfig;
  /**
   * The FormGroup allows for the the field component to tied up and into to the
   * DynamicForm form group
   */
  @Input() group: FormGroup;

  componentRef: any;
  
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }
  
  /**
   * OnInit, the component factory creates a component based on the type passed to it
   * using the componentMapper to fetch the appropriate component class. The field and 
   * group are then set to the field and group variables within the instantiated field
   * component (checkbox, chips, date, input, etc), where the fields are used to tie into
   * the values and settings, and the group is used to connect the field component to the
   * DynamicForm component form group.
   */
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }
}
