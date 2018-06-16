import { Component, OnInit } from '@angular/core';
import { TableData } from './users.data';
@Component({
  selector: 'app-user-support',
  templateUrl: './user-support.component.html',
  styleUrls: ['./user-support.component.scss']
})
export class UserSupportComponent implements OnInit {
  supportUsers: Array<any>;
  constructor() { }

  ngOnInit() {
    this.supportUsers = TableData;
  }

}
