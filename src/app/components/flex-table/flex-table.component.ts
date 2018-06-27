import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';

import { FlexTableModalComponent } from './flex-table-modal/flex-table-modal.component';
import { MatDialog } from '@angular/material';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-flex-table',
  templateUrl: './flex-table.component.html',
  styleUrls: ['./flex-table.component.scss'],
})
export class FlexTableComponent implements OnInit {
  /**
   * The editIn is a ENUM with values of INLINE and MODAL.
   * INLINE - Allows user to click on a table data cell and edit it
   * without need to open a modal. Sutable for less detailed objects
   * that do not require extensive validation.
   * MODAL - Opens the object in a modal for editing. Better for
   * complex data entry and editing. Allows for a custom component
   * and angular form to be used featuring full validation.
   */
  @Input() editIn: 'INLINE'|'MODAL';

  /**
   * This table is desigend to auto build and populate to fit
   * an array of objects. The objects in the array must be flat
   * (no nested object structures)
   */
  @Input() arrayObjects: Observable<any>;

  /**
   * Set displayObject keyvalue to false to hide the column.
   * Set a string to override the database keyvalue name.
   * Set to true to use existing name.
   */
  @Input() displayObject;

  /**
   * Some users should not be allowed to persist all data.
   * The dataAccessObject dictates these privileges.
   *
   * Its form and function hasn't been set up yet.
   */
  @Input() dataAccessObject;

  /**
   * The table should remain agnostic. Any database updating
   * should be performend by the parent component.
   */
  @Output() outEvent: EventEmitter<{ type: string; data: string | Array<any> }>;

  tableData: Observable<any>;

  headerData: string[];
  isEditing: EventTarget;
  reverse: true;
  order: string;
  editedValue: string;
  filter: Object = {};

  constructor(public dialog: MatDialog) {
    this.outEvent = new EventEmitter<{
      type: string;
      data: string | Array<any>;
    }>();
  }

  ngOnInit(): void {
    this.tableData = this.arrayObjects.pipe(
      tap((val: any) => {
        this.headerData = this.getUniqueKeys(val);
        this.order = this.headerData[0];
        this.outEvent.emit({ type: 'init', data: 'none' });
      })
    );
  }

  openDialog(obj: {}) {
    const dialogRef = this.dialog.open(FlexTableModalComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('persisting data', obj);
    });
  }

  getUniqueKeys(obj = []): string[] {
    return obj.reduce((acc, curr, idx) => {
      Object.keys(curr).forEach(key => {
        if (this.displayObject) {
          if (this.displayObject[key] && acc.indexOf(key) === -1) {
            acc.push(key);
          }
        } else {
          if (acc.indexOf(key) === -1) {
            acc.push(key);
          }
        }
      });
      return acc;
    }, []);
  }

  useAlt(head): boolean {
    if (!this.displayObject) {
      return true;
    }
    return typeof this.displayObject[head] !== 'string';
  }

  deleteFilter(item: any): void {
    delete this.filter[item];
  }

  edit(e: Event, obj: any, key: string) {
    switch (this.editIn) {
      case 'INLINE':
        this.editInLine(e, obj, key);
        break;
      case 'MODAL':
        this.editInModal(obj);
        break;
      default:
    }
  }

  /**
   * editValue() is the function call for INLINE editting
   *
   * @param e is the event of the click and used to manipulate html element view
   * @param obj is the object being edited
   * @param key is the key for the key of the object being editted
   */
  editInLine(e: Event, obj: any, key: string): void {
    if (!this.isEditing || this.isEditing === e.target) {
      if (this.isEditing && this.editedValue !== e.target['value']) {
        obj[key] = this.isEditing['value'];
        this.outEvent.emit({ type: 'valueChanged', data: obj });
      }
      if (e.target['tagName'] === 'TD') {
        this.toggleFromTD(e);
      } else {
        this.toggleFromInput(e);
      }
    }
  }

  /**
   * Due to Firefox not allowing click passthrough on disabled input fields,
   * it has to be manually set in scss. Because of this, when the input is actively
   * for editing, the click point changes to either it or the <td> element it is in
   * based on where the user clicks in the cell. The two toggle functions ensure
   * that it is the input that is always disabled by testing for click reference point.
   **/
  toggleFromTD(e) {
    e.target['firstChild']['disabled'] = !e.target['firstChild']['disabled'];
    e.target['firstChild'].focus();
    this.editedValue = !e.target['firstChild']['disabled']
      ? e.target['firstChild']['value']
      : undefined;
    this.isEditing = !e.target['firstChild']['disabled']
      ? e.target['firstChild']
      : undefined;
  }

  toggleFromInput(e) {
    e.target['disabled'] = !e.target['disabled'];
    e.target.focus();
    this.editedValue = !e.target['disabled'] ? e.target['value'] : undefined;
    this.isEditing = !e.target['disabled'] ? e.target : undefined;
  }

  /**
   * openObject is the function call for MODAL editting
   *
   * @param obj the object being opened in a modal for editting
   */
  editInModal(obj: any): void {
    this.openDialog(obj);
  }
}
