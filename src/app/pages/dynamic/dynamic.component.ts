import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
import { UserAPI } from '@services/api/userAPI.service';
import { take } from 'rxjs/operators';

import { DetailHostDirective } from './detail-host.directive';
import { DynamicHostDirective } from './dynamic-host.directive';
import { DynamicItem } from './dynamic-item';
import { DynamicInterface } from './dynamic.interface';
import { DynamicService } from './dynamic.service';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private userAPI: UserAPI,
    private route: ActivatedRoute,
    private dynamicService: DynamicService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  @ViewChildren('dynamic', { read: ViewContainerRef }) public dynamicComponents: QueryList<ViewContainerRef>;
  @ViewChild(DetailHostDirective) detailHost: DetailHostDirective;
  @ViewChild(DynamicHostDirective) dynamicHost: DynamicHostDirective;
  reviewId;

  ngOnInit() {
    console.log('...loading new DynamicPage');
    this.userAPI.getUser(this.authenticationService.getEmployeeId()).subscribe(user => {
      this.authenticationService.currentUserArsData = user
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.reviewId = params.get('id');
        const dynamicType = params.get('dynamic-type');
        
        console.log(`...loading review type ${dynamicType} with id ${this.reviewId}`);
        const dynamicItems: DynamicItem[] = this.dynamicService.mapCards(dynamicType, this.authenticationService.currentUserArsData, this.reviewId);
        this.loadComponents(dynamicItems);
      });
    });
  }

  loadComponents(dynamicItems: DynamicItem[]) {
    // the containers need to be cleared each time, resetting the dynamic page.
    this.detailHost.viewContainerRef.clear();
    this.dynamicHost.viewContainerRef.clear();
    dynamicItems.forEach((dynamicItem, index) => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        dynamicItem.component
      );

      let viewContainerRef: ViewContainerRef;
      /**
       * Not all pages have reviewId values. Some (like admin and dashboard) are not dynamic pages built around a particular
       * review item. These pages do not have a details subheader component. The presense of an reviewId value is used to 
       * determine whether a detail component exists and should be attached to thew detailHost rather than the dynamicHost.
       * If this pattern does not continue in the future, it may be better to have an identifier on detail components to make
       * this determination instead.
       */
      if (dynamicItem.data.detailComponent) {
        viewContainerRef = this.detailHost.viewContainerRef;
      } else {
        viewContainerRef = this.dynamicHost.viewContainerRef;
      }

      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<DynamicInterface>componentRef.instance).data = dynamicItem.data;
    })
  }

}
