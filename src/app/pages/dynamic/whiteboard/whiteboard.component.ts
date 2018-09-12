import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { WhiteboardIssueFormComponent } from '@forms/whiteboard-issue-form/whiteboard-issue-form.component';
import { take } from 'rxjs/operators';
import { ModalComponent } from '@components/modal/modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss']
})
export class WhiteboardComponent implements OnInit {
  @HostBinding('style.flex') flex: string;
  @Input() data;
  review;
  wbTitle;
  modalComponentTitle = 'Whiteboard';
  modalComponentClass = WhiteboardIssueFormComponent;

  /**
   * The displayObject is used to specify how the table will display the data returned in it's columns.
   * if false, the column is not displayed
   * if true, it is displayed the column using the key as the column header
   * if a string, it displays the column using the string as the column header
   */
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
    docSignedDate: "Dynamiced",
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
    if(this.data.style){ this.flex = this.data.style.flex }
    this.data.reviewData$.subscribe(review => {
      this.review = review;
      this.wbTitle = this.getWbTitle(review, this.data.type);
    });
  }

  openDialog(obj: {}) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        obj,
        componentClass: this.modalComponentClass,
        title: this.modalComponentTitle,
        review: this.review,
        wbTitle: this.wbTitle,
        ...this.data,
      },
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log(`Dialog result: ${data}`); 
    });
  }

  tableEvents(e) {
    console.log('TableEvent', e);
    if (e.type === 'currentValue') {
      this.openDialog(e.data);
    }
  }

  getWbTitle(review: any, type: string) {
    switch (type) {
      case 'part':
        return `Part ${review.partNo} | Serial ${review.serialNo}`;
      case 'document':
        return `File ${review.docFilename} | ID ${review.documentId}`
      case 'eid':
        return `Once built, add EID model information name here.`
      default:
        console.error('No type recieved. Please check data mapping.')
    }
  }
}
