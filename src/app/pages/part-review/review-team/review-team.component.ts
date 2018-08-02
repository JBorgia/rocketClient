import { Component, OnInit, Input } from '@angular/core';
import { EditComponent } from '@components/edit/edit.component';
import { Observable } from 'rxjs';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '@components/modal/modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-review-team',
  templateUrl: './review-team.component.html',
  styleUrls: ['./review-team.component.scss']
})
export class ReviewTeamComponent implements OnInit {
  @Input() teamData$: Observable<any>;
  faUser = faUser;
  componentTitle = 'Review Team Member';
  componentClass = EditComponent;
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

  }

  openDialog(obj: {}) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { obj, componentClass: this.componentClass, componentTitle: this.componentTitle },
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('persisting data', obj);
    });
  }
  
  tableEvents(e) {
    console.log('TableEvent', e);
    if(e.type === 'currentValue'){
      this.openDialog(e.data);
    }
  }
}
