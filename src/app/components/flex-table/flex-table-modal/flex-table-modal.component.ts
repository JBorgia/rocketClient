import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-flex-table-modal',
  templateUrl: './flex-table-modal.component.html',
  styleUrls: ['./flex-table-modal.component.scss'],
})
export class FlexTableModalComponent implements OnInit {
  keys;
  isEditing: EventTarget;
  editedValue: string;
  @Output() outEvent: EventEmitter<{ type: string; data: string | Array<any> }>;

  constructor(
    public dialogRef: MatDialogRef<FlexTableModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

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
}
