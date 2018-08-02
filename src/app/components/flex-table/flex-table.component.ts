import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from '@components/modal/modal.component';
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
  @Input() inline = false;

  /**
   * This table is desigend to auto build and populate to fit
   * an array of objects. The objects in the array must be flat
   * (no nested object structures)
   */
  @Input() arrayObjects: Observable<any>;

  /**
   * Set displayObject keyvalue to false to hide the column.
   * Set a string to override the database keyvalue name as the header name.
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
  activeObjEditing: EventTarget;
  reverse: true;
  order: string;
  editedValue: string;
  filter: Object = {};

  constructor(private router: Router, public dialog: MatDialog) {
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

  getUniqueKeys(obj = []): string[] {
    if(Array.isArray(obj)){
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
    } else {
      console.error('ERROR: Not an Array. FlexTable requires an array of flat objects.');
    }
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
    if (this.inline) {
        this.editInLine(e, obj, key);
    } 
    
    this.outEvent.emit({ type: 'currentValue', data: obj });
  }

  /**
   * editValue() is the function call for INLINE editting
   *
   * @param event is the event of the click and used to manipulate html element view
   * @param obj is the object being edited
   * @param key is the key for the key of the object being editted
   */
  editInLine(event: Event, obj: any, key: string): void {
    const clickedHtmlElement = event.target;
    if (!this.activeObjEditing || this.activeObjEditing === clickedHtmlElement) {
      if (
        this.activeObjEditing &&
        this.editedValue !== clickedHtmlElement['value']
      ) {
        obj[key] = this.activeObjEditing['value'];
        this.outEvent.emit({ type: 'valueChanged', data: obj });
      }

      /**
       * Due to Firefox not allowing click passthrough on disabled input fields,
       * it has to be manually set in scss. Because of this, when the input is actively
       * for editing, the click point changes to either it or the <td> element it is in
       * based on where the user clicks in the cell. The two toggle functions ensure
       * that it is the input that is always disabled by testing for click reference point.
       **/
      switch (clickedHtmlElement['tagName']) {
        case 'TD':
          this.toggle(clickedHtmlElement['firstChild']); // If the <td> was clicked, pass the child <input> for toggle.
          break;
        case 'INPUT':
          this.toggle(clickedHtmlElement);
          break;
        case 'HREF':
          console.log('open object in href');
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
    this.editedValue = !selectedInput['disabled'] ? selectedInput['value'] : undefined;
    this.activeObjEditing = !selectedInput['disabled'] ? selectedInput : undefined;
  }

  /**
   * openObject is the function call for MODAL editting
   *
   * @param obj the object being opened in a modal for editting
   */
  // editInModal(obj: any): void {
  //   this.openDialog(obj);
  // }

  // openDialog(obj: {}) {
  //   const dialogRef = this.dialog.open(ModalComponent, {
  //     data: { obj, componentClass: this.componentClass, componentTitle: this.componentTitle },
  //   });
  //   dialogRef.afterClosed().subscribe(data => {
  //     console.log('persisting data', obj);
  //   });
  // }

  /**
   * openObject is the function call for PAGE editting
   *
   * @param obj the object being opened in a new page for editting
   */
  // editInPage(obj: any): void {
  //   console.log('Editing in new page', obj);
  //   let objId = obj ? obj.partId : null;
  //   console.log('objId: ' + objId);
  //   if (this.pageRoute && objId) {
  //     this.router.navigate(['/part-review', objId]);
  //   } else {
  //     console.error('ERROR: this.pageRoute is NULL. No forwarding route was set.');
  //   }

  // }
}
