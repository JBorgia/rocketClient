import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ModalComponent } from '@app/components/modal/modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-tool',
  templateUrl: './tool-item.component.html',
  styleUrls: ['./tool-item.component.scss']
})
export class ToolItemComponent implements OnInit {
  @Input() data;
  @Input() title;
  @Input() icon;
  @Input() tooltip;
  @Input() modalClass;
  @Input() modalTitle;
  @Output() closeExpansionPanel: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    console.log('ToolItemComponent', this);
  }

  openDialog() {
    const dialogRef = this.dialog.open(
      ModalComponent,
      {
        data: { componentClass: this.modalClass, title: this.modalTitle },
      }
    );
    dialogRef.afterClosed().subscribe(data => {
      console.log('submitted', data);
    });
    this.closeExpansionPanel.emit();
  }

}
