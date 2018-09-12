import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '@components/modal/modal.component';
import { MatDialog } from '@angular/material';
import { SelectEmployeeFormComponent } from '@app/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @HostBinding('style.flex') flex: string;
  @Input() data: any;
  usersData$: Observable<any>;
  users;
  faUser = faUser;
  modalComponentTitle = 'Select Employee';
  modalComponentClass = SelectEmployeeFormComponent;
  /**
   * The displayObject is used to specify how the table will display the data returned in it's columns.
   * if false, the column is not displayed
   * if true, it is displayed the column using the key as the column header
   * if a string, it displays the column using the string as the column header
   */
  displayObject = {
    userId: false,
    firstName: "First Name",
    lastName: "Last Name",
    org: false,
    isActive: false,
    createdOn: false,
    createdBy: false,
    lastUpdatedOn: false,
    lastUpdatedBy: false,
    supplierName: false,
    users: true,
    role: true,
    userType: false,
    supplier: false,
    technology: true,
    company: true,
    email: false
  }

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    if(this.data.style){ this.flex = this.data.style.flex }
    this.usersData$ = this.data.usersData$;
    this.usersData$.subscribe(users=> this.users = users);
  }

  openDialog(user: {}) {
    const dialogRef = this.dialog.open(
      ModalComponent, 
      {
        data: { user, users: this.users, componentClass: this.modalComponentClass, title: this.modalComponentTitle },
      }
    );
    dialogRef.afterClosed().subscribe(data => {
      console.log('submitted', data);
    });
  }
  
  tableEvents(e) {
    console.log('TableEvent', e);
    if(e.type === 'currentValue'){
      this.openDialog(e.data);
    }
  }
}
