import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-flex-table-modal',
  templateUrl: './flex-table-modal.component.html',
  styleUrls: ['./flex-table-modal.component.scss'],
})
export class FlexTableModalComponent implements OnInit {
  keys;
  isEditing: EventTarget;
  editedValue: string;

  constructor(
    public dialogRef: MatDialogRef<FlexTableModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.data = this.data;
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

  editValue(e, property: string): void {
    if (!this.isEditing || this.isEditing === e.target) {
      if (this.isEditing && this.editedValue !== e.target['value']) {
        this.data[property] = this.isEditing['value'];
      }
      e.target['disabled'] = !e.target['disabled'];
      e.target.focus();
      this.editedValue = !e.target['disabled'] ? e.target['value'] : undefined;
      this.isEditing = !e.target['disabled'] ? e.target : undefined;
    }
  }
}
