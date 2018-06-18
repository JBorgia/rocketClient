import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PaginationService } from '../../../app/services/pagination.service';

@Component({
  selector: 'app-flex-table',
  templateUrl: './flex-table.component.html',
  styleUrls: ['./flex-table.component.scss'],
})

export class FlexTableComponent implements OnInit {
  @Input() tabledata: Array<any> = [];
  @Output() outEvent: EventEmitter<{ type: string, data: string | Array<any> }>;
  // Array of all items
  private allItems: any = [];

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

  constructor(private paginationService: PaginationService) {
    this.outEvent = new EventEmitter<{ type: string, data: string | Array<any> }>();
  }

  ngOnInit(): void {
    this.headerData = this.getUniqueKeys(this.tabledata);
    this.order = this.headerData[0];
    this.outEvent.emit({ type: 'init', data: 'none' });

    this.allItems = this.tabledata;   // Load data into allItems
    console.log('this is allitems', this.allItems);
    this.setPage(1);        // Initialize to page 1
  }

  getUniqueKeys(obj: any): string[] {
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

  deleteFilter(item: any): void {
    delete this.filter[item];
  }

  setPage(page: number) {
    if (page < 1 || page > this.pagination.totalPages) {
      return;
    }

    // Get pagination object from service
    this.pagination = this.paginationService.getPagination(this.allItems.length, page);

    // Get current page of items
    this.pagedItems = this.allItems.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
  }

}
