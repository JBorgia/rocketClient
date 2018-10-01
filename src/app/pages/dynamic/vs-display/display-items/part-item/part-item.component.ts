import { Component, OnInit, Input } from '@angular/core';
import { Part } from '@app/models/ars-app.models';

import {
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-part-item',
  templateUrl: './part-item.component.html',
  styleUrls: ['./part-item.component.scss']
})
export class PartItemComponent implements OnInit {
  item: Part;
  review;
  faExternalLinkAlt = faExternalLinkAlt;
  pageRoute = '/dynamic';

  constructor(
    private router: Router,
  ) { }
  
  ngOnInit() {
  }

  /**
   * openObject is the function call for PAGE editting
   *
   * @param obj the object being opened in a new page for editting
   */
  openInPage(item: Part): void {
    console.log('Editing in new page', item);
    let objId = item ? item.partId : null;
    /** 
     * Here we will need to get from the review, the type of review it is. This value would set type as the routing param.
     * Additionally, when review is generalized, the DocumentsComponent and PartsComponents will likely be able to be combined into
     * a ReviewComponent that configures based on the route param.
    */
    if (this.pageRoute && objId) {
      this.router.navigate([this.pageRoute, 'part', objId]);
    } else {
      console.error('ERROR: this.pageRoute is NULL. No forwarding route was set.');
    }
  }


}
