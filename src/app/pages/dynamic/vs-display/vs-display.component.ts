import { Component, Input, OnInit, ViewChild, AfterViewInit, HostBinding, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '@services/authentication.service';
import { PartAPI } from '@app/services';
import { ChangeEvent } from '@components/virtual-scroll/virtual-scroll.component';
import { VsDisplayService } from './vs-display.service';
import { VsData } from '@pages/dynamic/vs-display/vs-data-object';

@Component({
  selector: 'app-vs-display',
  templateUrl: './vs-display.component.html',
  styleUrls: ['./vs-display.component.scss']
})
export class VsDisplayComponent implements OnInit, AfterViewInit {
  @ViewChild('searchForm') searchForm: ElementRef;
  @HostBinding('style.flex') flex: string;
  @Input() data: VsData;
  protected loading: boolean;
  private resizeSubscription: Subscription;
  items;
  review;
  currentPage;


  constructor(
    public authenticationService: AuthenticationService,
    private partAPI: PartAPI,
    private vsDisplayService: VsDisplayService,
  ) { }

  ngAfterViewInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  }

  ngOnInit(): void {
    console.log('vs-display this.data', this.data);

    if (this.data.vsObject.style) { this.flex = this.data.vsObject.style.flex; }
    if (this.data.vsObject.displayData$) {
      this.loading = true;
      this.data.vsObject.displayData$.subscribe(items => {
        console.log('displayData$', items);
        /**
         * For styling and sorting purpose the item index is important. However, as Virtual Scroll works by updating values
         * in a limited number of recycled scrolling divs, the ngFor index value isn't accurate. This ensures there is a reference point.
         */
        this.items = items.map((value, index) => { return { index: index + 1, ...value } });
        this.loading = false;
        /**
         * the number of items initially loaded is a factor of pageSize. It's initial value is calculated and set here and stored as current page
         */
          this.currentPage = this.items.length / this.data.vsObject.pageSize;
      });
    } else {
      this.loading = false;
    }
  }

  protected fetchMore(event: ChangeEvent) {
    if (!this.data.vsObject.pageSize || !this.items || event.end !== this.items.length - 1) return;
    this.loading = true;
    this.vsDisplayService.getBy(this.data, this.currentPage).subscribe(moreItems => {
      this.append(moreItems);
      this.currentPage++;
      this.loading = false;
    });
  }

  protected append(moreItems) {
    // console.log('moteItems', moreItems);
    if(!moreItems[0]) { return } // If moreItems is undefined, or empty, return without appending.
    const currentLength = this.items.length;
    const itemsWithIndex = moreItems.map((value, index) => { return { 'index': currentLength + index + 1, ...value } });
    this.items = this.items.concat(itemsWithIndex);
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
