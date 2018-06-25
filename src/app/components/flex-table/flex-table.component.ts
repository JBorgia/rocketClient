import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

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
  @Input() inlineEdit = true;
  @Input() arrayObjects: Observable<any>;
  /**
   * Set displayObject keyvalue to false to hide the column.
   * Set a string to override the database keyvalue name.
   * Set to true to use existing name.
   * **/
  @Input() displayObject;
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

  openDialog(obj: {}) {
    this.dialog.open(FlexTableModalComponent, {
      data: obj,
    });
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

  editValue(e: MouseEvent, obj: any, property: string): void {
    if (!this.inlineEdit) {
      return;
    }
    if (!this.isEditing || this.isEditing === e.target) {
      if (this.isEditing && this.editedValue !== e.target['value']) {
        obj[property] = this.isEditing['value'];
        this.outEvent.emit({ type: 'valueChanged', data: obj });
      }
      e.target['disabled'] = !e.target['disabled'];
      this.editedValue = !e.target['disabled'] ? e.target['value'] : undefined;
      this.isEditing = !e.target['disabled'] ? e.target : undefined;
    }
  }

  openObject(e: MouseEvent, obj: any, property: string): void {
    if (this.inlineEdit) {
      return;
    }
    this.openDialog(obj);
    console.log('MouseEvent: ', e);
    console.log('Object: ', obj);
    console.log('Property: ', property);
    // if (!this.isEditing || this.isEditing === e.target) {
    //   if (this.isEditing && this.editedValue !== e.target['value']) {
    //     obj[property] = this.isEditing['value'];
    //     this.outEvent.emit({ type: 'valueChanged', data: obj });
    //   }
    //   e.target['disabled'] = !e.target['disabled'];
    //   this.editedValue = !e.target['disabled'] ? e.target['value'] : undefined;
    //   this.isEditing = !e.target['disabled'] ? e.target : undefined;
    // }
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
}
