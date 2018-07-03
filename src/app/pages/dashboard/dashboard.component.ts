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
  checkMyAccess;
  constructor(
    public auth: UserService,
    private authenticationAPI: AuthenticationAPI
  ) {
    this.reviewData$ = of(TableData);
    this.checkMyAccess = this.authenticationAPI.validateUserInTestTable();
  }

  ngOnInit() {}

  tableEvents(value: Event): void {
    if (value) {
      console.log(value);
    }
  }

}
