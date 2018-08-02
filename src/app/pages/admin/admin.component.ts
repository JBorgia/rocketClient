import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, Input, Inject, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { AuthenticationAPI } from '@services/api/authenticationAPI.service';
import { UserService } from '@services/user.service';
import { DOCUMENT } from '@angular/platform-browser';

import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { UserAPI, PartAPI, DocumentAPI, WhiteboardAPI } from '@app/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  partsData$;
  usersData$;
  wbIssuesData$;
  constructor(
    private http: HttpClient,
    public auth: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private partAPI: PartAPI,
    private authenticationAPI: AuthenticationAPI,
    @Inject(DOCUMENT) private doc: Document,
    private userAPI: UserAPI,
    private documentAPI: DocumentAPI,
    private whiteboardAPI: WhiteboardAPI
    ) {

  }

  private _isCollapsed = 'collapsed';
  private _isCollapsible = false;
  userInfo = this.auth.getUserInfo();

  userInTestTableValue = '';
  userAccessChecked = false;

  ngOnInit() {
    this.partsData$ = this.partAPI.getAll();

    this.usersData$ = this.userAPI.getAll();

    this.wbIssuesData$ = of([]);
    // this.wbIssuesData$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.whiteboardAPI.getWbIssuesByPart(this.partId = params.get('id')))
    // );
  }

  tableEvents(value: Event): void {
    if (value) {
      console.log(value);
    }
  }

}

