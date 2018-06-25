import { Component, OnInit } from '@angular/core';
import { UserAPI } from '@app/services/api/userAPI.service';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  registeredUsers: Observable<User[]>;
  users;

  constructor(private userAPI: UserAPI) {
    this.registeredUsers = this.userAPI.getAllUsers();
  }
  
  ngOnInit() {

  }
  
  tableEvents(value: Event): void {
    if (value) {
      console.log(value);
    }
  }
}
