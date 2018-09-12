import { Component, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, HostBinding } from '@angular/core';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';
import { PartAPI } from '@app/services';
import { ChangeEvent } from '@components/virtual-scroll/virtual-scroll.component';
import { VsResultsService } from './vs-results.service';

@Component({
  selector: 'app-vs-results',
  templateUrl: './vs-results.component.html',
  styleUrls: ['./vs-results.component.scss']
})
export class VsResultsComponent implements OnInit {
  @HostBinding('style.flex') flex: string;
  @Input() data;
  @ViewChild('dynamicResultsRef', { read: ViewContainerRef }) dynamicResultsRef: ViewContainerRef;
  title = "REVIEWS";
  userInfo;
  protected loading: boolean;
  items;
  page;
  pageSize = 50;
  faFileAlt = faFileAlt;
  pageRoute = '/dynamic';


  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private partAPI: PartAPI,
    private componentFactoryResolver: ComponentFactoryResolver,
    private vsResultsService: VsResultsService,
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.data.style) { this.flex = this.data.style.flex; }
    this.userInfo = this.authenticationService.getUserInfo();
    if (this.data.reviewsData$) {
      this.data.reviewsData$.subscribe(items => {
        /**
         * For styling and sorting purpose the item index is important. However, as Virtual Scroll works by updating values
         * in a limited number of recycled scrolling divs, the ngFor index value isn't accurate. This ensures there is a reference point.
         */
        this.items = items.map((value, index) => { return { index, ...value } });
        this.page = this.items.length/this.pageSize;
      });
    }

  }

  protected fetchMore(event: ChangeEvent) {
    if (!this.items || event.end !== this.items.length - 1 ) return;
    this.loading = true;
    this.vsResultsService.getByType(this.data.dynamicType, this.data.currentUser.userId,  this.page, this.pageSize).subscribe(moreItems => {
      const currentLength = this.items.length;
      const itemsWithIndex = moreItems.map((value, index) => { return { 'index': index + currentLength, ...value } });
      this.items = this.items.concat(itemsWithIndex);
      this.page++;
      this.loading = false;
    });
  }

  clickEvent(e) {
    console.log('clickEvent', e);
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
