import { Component, OnInit } from '@angular/core';
import { UserAPI } from '@app/services/api/userAPI.service';
import { User } from '@models/user.model';
import { Observable, of } from 'rxjs';

import { testUsers } from './test-data';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  registeredUsers: Observable<any[]>;
  users;

  displayObject = {
    'userId': false,
    'firstName': 'First Name',
    'lastName': true,
    'orgName': false,
    'isActive': false,
    'createdOn': false,
    'createdBy': false,
    'lastUpdatedOn': false,
    'lastUpdatedBy': false,
    'roleName': true,
    'userType': false,
    'supplierName': false,
    'supplierCode': false,
    'team': false,
    'technology': false,
    'company': false,
    'email': false
  };

  constructor(private userAPI: UserAPI) {
    // this.registeredUsers = this.userAPI.getAllUsers();
    this.registeredUsers = of(testUsers);
  }

  ngOnInit() {}

  tableEvents(value: Event): void {
    if (value) {
      console.log(value);
    }
  }
}
