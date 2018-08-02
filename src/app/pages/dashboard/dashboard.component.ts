import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ViewChild, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationAPI } from '@services/api/authenticationAPI.service';
import { UserService } from '@services/user.service';
import { UserPartAPI } from '@services/api/userPartAPI.service';

import { of, Observable } from 'rxjs';

import { TableData } from './dummy-data';
import { DashboardInterface } from '@pages/dashboard/dashboard.interface';
import { DashboardDirective } from '@pages/dashboard/dashboard.directive';
import { DashboardItem } from '@pages/dashboard/dashboard-item';
import { PartReviewComponent } from '@pages/part-review/part-review.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(DashboardDirective) dashboardHost: DashboardDirective;
  componentClass = PartReviewComponent;
  dasboardItems: DashboardItem[];
  userParts = [];
  pageRoute = '/part-review';

  displayObject = {
    partId: false,
    supplierName: "Supplier",
    partName: "Part",
    partNo: "Part#",
    serialNo: "Serial#",
    lotNo: "Lot#",
    missionName: "Mission",
  }
  stringifiedData;

  rev;
  reviewData$: Observable<any>;
  checkMyAccess;

  constructor(
    public auth: UserService,
    private router: Router,
    private userPartService: UserPartAPI,
    private authenticationAPI: AuthenticationAPI,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { this.reviewData$ = of(TableData); }

  userInfo = this.auth.getUserInfo();
  userId = this.auth.getEmployeeId();

  userInTestTableValue = '';
  userAccessChecked = false;


  ngOnInit() {
    console.log(this.userId);
    this.reviewData$ = this.userPartService.getPartForUser(this.userId);
    if(this.dasboardItems){
      this.loadComponents();
    }
  }
  
  tableEvents(e) {
    console.log('TableEvent', e);
    if(e.type === 'currentValue'){
      this.editInPage(e.data);
    }
  }

  ngOnDestroy() {
    this.dasboardItems = undefined;
  }

  /**
   * openObject is the function call for PAGE editting
   *
   * @param obj the object being opened in a new page for editting
   */
  editInPage(obj: any): void {
    console.log('Editing in new page', obj);
    let objId = obj ? obj.partId : null;
    console.log('objId: ' + objId);
    if (this.pageRoute && objId) {
      this.router.navigate([this.pageRoute, objId]);
    } else {
      console.error('ERROR: this.pageRoute is NULL. No forwarding route was set.');
    }

  }

  loadComponents() {
    this.dasboardItems.forEach(dasboardItem => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        dasboardItem.component
      );

      const viewContainerRef = this.dashboardHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<DashboardInterface>componentRef.instance).data = dasboardItem.data;
    })
  }
}
