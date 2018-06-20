import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  location_local: Location;

  constructor(
    private location: Location,
    public auth: UserService, ) {
    this.location_local = location;
  }

  ngOnInit() {
  }

  showNav(): boolean {
    console.log('run showNav')
    return this.location_local.isCurrentPathEqualTo('/landing');
  }
}
