import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
 import { AuthenticationService } from '@services/authentication.service';
  
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})

export class ReviewsComponent implements OnInit {
  @HostBinding('style.flex') flex: string;
  @Input() data;
  title = "REVIEWS";
  userInfo;
  reviewsData$: Observable<any>;
  faFileAlt = faFileAlt;
  pageRoute = '/dynamic';
  /**
   * The displayObject is used to specify how the table will display the data returned in it's columns.
   * if false, the column is not displayed
   * if true, it is displayed the column using the key as the column header
   * if a string, it displays the column using the string as the column header
   */
  displayObject = {
    partId: false,
    supplierName: "Supplier",
    partName: "Part",
    partNo: "Part#",
    serialNo: "Serial#",
    lotNo: "Lot#",
    missionName: "Mission",
  }

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    if(this.data.style){ this.flex = this.data.style.flex }
    this.userInfo = this.authenticationService.getUserInfo();
    this.reviewsData$ = this.data.reviewsData$;
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
    let objId = obj ? obj.partId : null;
    let reviewType = 'part'
    /** 
     * Here we will need to get from the review, the type of review it is. This value would set type as the routing param.
     * Additionally, when review is generalized, the DocumentsComponent and PartsComponents will likely be able to be combined into
     * a ReviewComponent that configures based on the route param.
    */
    if (this.pageRoute && objId) {
      this.router.navigate([this.pageRoute, reviewType, objId]);
    } else {
      console.error('ERROR: this.pageRoute is NULL. No forwarding route was set.');
    }
  }
}
