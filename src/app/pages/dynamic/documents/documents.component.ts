import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  @HostBinding('style.flex') flex: string;
  @Input() data;
  documentsData$: Observable<any>;
  faFileAlt = faFileAlt;
  title = "DOCUMENTS";
  pageRoute = "/dynamic";
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
    public router: Router,
  ) { }

  ngOnInit() {
    if(this.data.style){ this.flex = this.data.style.flex }
    this.documentsData$ = this.data.documentsData$;
  }

  tableEvents(e) {
    console.log('TableEvent', e);
    if (e.type === 'currentValue') {
      this.editInPage(e.data);
    }
  }

  /**
   * openObject is the function call for PAGE editting
   *
   * @param obj the object being opened in a new page for editting
   */
  editInPage(obj: any): void {
    console.log('Editing in new page', obj);
    let objId = obj ? obj.documentId : null;
    let reviewType = 'document'
    /** 
     * Here we will need to get from the review, the type of review it is. This value would set type as the routing param.
     * Additionally, when review is generalized, the DocumentsComponent and PartsComponents will likely be able to be combined into
     * a ReviewComponent that configures based on the route param.
    */
    if (this.pageRoute && objId) {
      this.router.navigate([this.pageRoute, reviewType, objId]);
    } else {
      console.error('ERROR: either this.pageRoute or objId is Null. No forwarding route was set.');
    }
  }
}
