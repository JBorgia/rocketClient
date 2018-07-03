import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationAPI } from '@services/api/authenticationAPI.service';
import { UserService } from '@services/user.service';

import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TableData } from './dummy-data';
import { PartAPI } from '@app/services';

@Component({
  selector: 'app-part-review',
  templateUrl: './part-review.component.html',
  styleUrls: ['./part-review.component.scss']
})
export class PartReviewComponent implements OnInit {
  partData$;
  constructor(
    private http: HttpClient,
    public auth: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private partAPI: PartAPI,
    private authenticationAPI: AuthenticationAPI) { this.partData$ = of(TableData); }


  userInfo = this.auth.getUserInfo();

  userInTestTableValue = '';
  userAccessChecked = false;

  ngOnInit() {
    this.partData$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.partAPI.getPart(params.get('id')))
    );
  }

  tableEvents(value: Event): void {
    if (value) {
      console.log(value);
    }
  }
}
