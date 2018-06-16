import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthGuard } from './services/auth_guard.service';
import { UserService } from './services/user.service';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'Rxjs/Rx';
import { AuthenticationAPI } from './services/api/authenticationAPI.service';
import { NavbarService } from './services/navbar.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {


  constructor(
    public auth: UserService,
    public Authinacate: AuthGuard,
    private changeDetector: ChangeDetectorRef,
    private http: HttpClient,
    private router: Router,
    private authenticationAPI: AuthenticationAPI,
    public nav: NavbarService
  ) { }


  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

}
