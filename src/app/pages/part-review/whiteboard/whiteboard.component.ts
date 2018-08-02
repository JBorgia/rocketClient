import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EditComponent } from '@components/edit/edit.component';
import { ModalComponent } from '@components/modal/modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss']
})
export class WhiteboardComponent implements OnInit {
  @Input() wbIssuesData$: Observable<any>;
  componentTitle = 'Document';
  componentClass = EditComponent;
  displayObject = {
    documentId: false,
    docNo: false,
    docType: "Type",
    docLocation: false,
    docFilename: "File Name",
    docDesc: "Description",
    docStatus: "Status",
    docSource: "Source",
    docMediaType: false,
    docDate: false,
    docSigner: "Signer",
    docSignerRole: false,
    docSignedDate: "Reviewed",
    docSignerNote: "Note",
    docIdInSource: false,
    createdOn: false,
    createdBy: false,
    lastUpdatedOn: false,
    lastUpdatedBy: false,
    docAssociatedNo: false,
    docAssociatedGroup: false,
  }

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {

  }

  openDialog(obj: {}) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { obj, componentClass: this.componentClass, componentTitle: this.componentTitle },
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('persisting data', obj);
    });
  }
  
  tableEvents(e) {
    console.log('TableEvent', e);
    if(e.type === 'currentValue'){
      this.openDialog(e.data);
    }
  }
}
