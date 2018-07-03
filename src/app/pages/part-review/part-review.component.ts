import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationAPI } from '@services/api/authenticationAPI.service';
import { UserService } from '@services/user.service';

import { of } from 'rxjs';

import { TableData } from './dummy-data';

@Component({
  selector: 'app-part-review',
  templateUrl: './part-review.component.html',
  styleUrls: ['./part-review.component.scss']
})
export class PartReviewComponent implements OnInit {
  reviewData$;
  constructor(
    private http: HttpClient,
    public auth: UserService,
    private router: Router,
    private authenticationAPI: AuthenticationAPI) { this.reviewData$ = of(TableData); }


  userInfo = this.auth.getUserInfo();

  userInTestTableValue = '';
  userAccessChecked = false;

  ngOnInit() {
  }

  tableEvents(value: Event): void {
    if (value) {
      console.log(value);
    }
  }
}
