import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { AuthGuard } from './router/guards/auth.guard';
import { UserAPI } from '@services/index';
import { AuthenticationService } from '@services/authentication.service';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavbarService } from './services/navbar.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {


  constructor(
    public userAPI: UserAPI,
    public Authinacate: AuthGuard,
    private changeDetector: ChangeDetectorRef,
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    public nav: NavbarService
  ) { }


  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

}
