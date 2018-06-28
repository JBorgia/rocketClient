import { Component, OnInit, Input } from '@angular/core';
import { ModalComponent } from '@components/flex-table/flex-table-modal/modal.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, ModalComponent {
  @Input() data: any;
  keys;
  activeObjEditing: EventTarget;
  editedValue: string;
  constructor() {}

  ngOnInit() {
    this.keys = this.getUniqueKeys(this.data);
  }

  getUniqueKeys(obj = {}): string[] {
    const keys = [];
    Object.keys(obj).forEach(key => {
      if (keys.indexOf(key) === -1) {
        keys.push(key);
      }
    });
    return keys;
  }

  trackByFn(index, contact) {
    return contact.id;
  }

  editValue(e, property: string): void {
    const clickedHtmlElement = e.target;
    if (
      !this.activeObjEditing ||
      this.activeObjEditing === clickedHtmlElement
    ) {
      if (
        this.activeObjEditing &&
        this.editedValue !== clickedHtmlElement['value']
      ) {
        this.data[property] = this.activeObjEditing['value'];
      }
      /**
       * Due to Firefox not allowing click passthrough on disabled input fields,
       * it has to be manually set in scss. Because of this, when the input is actively
       * for editing, the click point changes to either it or the <td> element it is in
       * based on where the user clicks in the cell. The two toggle functions ensure
       * that it is the input that is always disabled by testing for click reference point.
       **/
      switch (clickedHtmlElement['tagName']) {
        case 'DIV':
          this.toggle(clickedHtmlElement['firstChild']); // If the <td> was clicked, pass the child <input> for toggle.
          break;
        case 'INPUT':
          this.toggle(clickedHtmlElement);
          break;
        default:
          console.error(
            'Incorrent HTML element selector reference',
            clickedHtmlElement['tagName']
          );
      }
    }
  }

  toggle(selectedInput) {
    selectedInput['disabled'] = !selectedInput['disabled'];
    selectedInput.focus();
    this.editedValue = !selectedInput['disabled']
      ? selectedInput['value']
      : undefined;
    this.activeObjEditing = !selectedInput['disabled']
      ? selectedInput
      : undefined;
  }

  get class() {
    return EditUserComponent;
  }
}
