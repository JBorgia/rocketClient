import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { CreateMessageFormComponent } from '@forms/create-message-form/create-message-form.component';
import { Observable } from 'rxjs';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '@components/modal/modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  @HostBinding('style.flex') flex: string;
  @Input() data: any;
  reviewData$: Observable<any>;
  teamData$: Observable<any>;
  type;
  review;
  team;
  faUser = faUser;
  modalComponentTitle = 'Team Member';
  modalComponentClass = CreateMessageFormComponent;
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
    team: true,
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
    this.type = this.data.type;
    this.reviewData$ = this.data.reviewData$;
    this.teamData$ = this.data.teamData$;
    this.reviewData$.subscribe(review=> this.review = review);
    this.teamData$.subscribe(team=> this.team = team);
  }

  openDialog(user: {}) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { user, type: this.type, team: this.team, review: this.review, componentClass: this.modalComponentClass, title: this.modalComponentTitle },
    });
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
