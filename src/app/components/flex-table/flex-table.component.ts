import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PaginationService } from '../../../app/services/pagination.service';

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
  @Input() tabledata = of([]);
  // isPaginated should be set to default value of number of items per page. 0 as default which disables pagination.
  @Input() pageSize = 0;
  @Output() outEvent: EventEmitter<{ type: string; data: string | Array<any> }>;
  // Array of all items
  allItems: Observable<any>;

  // Pagination object
  pagination: any = {};

  // Paged items
  pagedItems: any[];
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

  openDialog() {
    this.dialog.open(FlexTableModalComponent, {
      data: {
        animal: 'panda',
      },
    });
  }

  ngOnInit(): void {
    this.tabledata.pipe(
      tap(val => {
        console.log('val', val);
      }),
    ).subscribe(val => {
      console.log('val2', val);
    });

    // this.tabledata.pipe(
    //   tap(values => {
    //     this.headerData = this.getUniqueKeys(values);
    //     this.order = this.headerData[0];
    //     this.outEvent.emit({ type: 'init', data: 'none' });
    //     console.log('this is values', values);
    //     this.allItems = of(values); // Load data into allItems
    //   }),
    // )

    // this.headerData = this.getUniqueKeys(this.tabledata);

    // if(this.pageSize !== 0){
    //   this.setPage(1);        // Initialize to page 1
    // }
  }

  getUniqueKeys(obj = []): string[] {
    return obj.reduce((acc, curr) => {
      Object.keys(curr).forEach(key => {
        if (acc.indexOf(key) === -1) {
          acc.push(key);
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
    this.openDialog();
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

  deleteFilter(item: any): void {
    delete this.filter[item];
  }
}
