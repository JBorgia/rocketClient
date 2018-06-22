import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-flex-table-modal',
  templateUrl: './flex-table-modal.component.html',
  styleUrls: ['./flex-table-modal.component.scss'],
})
export class FlexTableModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FlexTableModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
}
