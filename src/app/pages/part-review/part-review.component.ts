import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, Input, Inject, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { AuthenticationAPI } from '@services/api/authenticationAPI.service';
import { UserService } from '@services/user.service';
import { DOCUMENT } from '@angular/platform-browser';

import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { TableData } from './dummy-data';
import { UserAPI, PartAPI, DocumentAPI, WhiteboardAPI } from '@app/services';

@Component({
  selector: 'app-part-review',
  templateUrl: './part-review.component.html',
  styleUrls: ['./part-review.component.scss']
})
export class PartReviewComponent implements OnInit {
  partData$;
  teamData$;
  documentsData$;
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

  partId;

  ngOnInit() {
    this.partData$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.partAPI.getPart(this.partId = params.get('id')))
    );

    this.teamData$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.userAPI.getUsersByPart(this.partId = params.get('id')))
    );
    this.documentsData$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.documentAPI.getDocumentsByPart(this.partId = params.get('id')))
    );
    this.wbIssuesData$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.whiteboardAPI.getWbIssuesByPart(this.partId = params.get('id')))
    );
  }

  tableEvents(value: Event): void {
    if (value) {
      console.log(value);
    }
  }

}

