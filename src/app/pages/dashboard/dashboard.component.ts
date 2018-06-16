import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '@services/user.service';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'Rxjs/Rx';
import { AuthenticationAPI } from '@services/api/authenticationAPI.service';

import { TableData } from './dummy-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  reviewData;
  constructor(
    private http: HttpClient,
    public auth: UserService,
    private router: Router,
    private authenticationAPI: AuthenticationAPI) { this.reviewData = TableData; }


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

  checkMyAccess() {
    const me = this;

    let params = new HttpParams();
    params = params.append('email', this.userInfo.email);

    this.authenticationAPI.validateUserInTestTable(params, null)
      .subscribe(
        data => {
          this.userInTestTableValue = data;
          this.userAccessChecked = true;
        },
        err => console.error(err),
        () => console.log('Finished checking access.')
      );
  }
}
