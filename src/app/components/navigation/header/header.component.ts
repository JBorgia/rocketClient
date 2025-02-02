import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private authenticationService: AuthenticationService
  ) {
      this.isLoggedIn$ = authenticationService.isLoggedIn();
    }

  ngOnInit() {
  }
}
