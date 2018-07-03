import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationAPI } from '@services/api/authenticationAPI.service';
import { UserService } from '@services/user.service';

import { of } from 'rxjs';

import { TableData } from './dummy-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  reviewData$;
<<<<<<< HEAD
=======
  checkMyAccess;
>>>>>>> fc245275d7559e57d7ad1637e8be3548d06b353e
  constructor(
    public auth: UserService,
<<<<<<< HEAD
    private router: Router,
    private authenticationAPI: AuthenticationAPI) { this.reviewData$ = of(TableData); }


  userInfo = this.auth.getUserInfo();

  userInTestTableValue = '';
  userAccessChecked = false;

  ngOnInit() {
=======
    private authenticationAPI: AuthenticationAPI
  ) {
    this.reviewData$ = of(TableData);
    this.checkMyAccess = this.authenticationAPI.validateUserInTestTable();
>>>>>>> fc245275d7559e57d7ad1637e8be3548d06b353e
  }

  ngOnInit() {}

  tableEvents(value: Event): void {
    if (value) {
      console.log(value);
    }
  }

}
