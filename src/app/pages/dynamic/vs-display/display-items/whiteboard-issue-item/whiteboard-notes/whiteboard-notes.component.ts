import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { WhiteboardStatusLkup } from '@app/models/ars-app.models';
import { WhiteboardIssueAPI } from '@app/services';
import { ModalComponent } from '@components/modal/modal.component';

import { AuthenticationService } from '@app/services/authentication.service';
import { VsData } from '@app/pages/dynamic/vs-display/vs-data-object';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { of } from 'rxjs';

@Component({
  selector: 'app-whiteboard-notes',
  templateUrl: './whiteboard-notes.component.html',
  styleUrls: ['./whiteboard-notes.component.scss']
})
export class WhiteboardNotesComponent implements OnInit {
  @Input() data;
  @Output() emitter: EventEmitter<any> = new EventEmitter<any>();
  review;
  title;


  whiteboardNotesVsData: VsData;
  // data: { whiteboard, type: this.review.type, review, componentClass: WhiteboardComponent, title: `Whiteboard ${this.item.issueId}` },

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    console.log('whiteboardNotes data', this.data);

    this.whiteboardNotesVsData = {
      currentUser: this.authenticationService.currentUserArsData,
      vsObject: {
        type: 'whiteboardNote',
        title: 'Whiteboard Notes',
        faIcon: faStickyNote,
        displayData$: of(this.data.whiteboard.whiteboardNotes),
        vsHeight: 'modal',
        parent: this.data.whiteboard
      },
      review: this.data.review,
    }
  }

  setStatus(): WhiteboardStatusLkup {
    if (this.data.whiteboard.status.statusId === 'Closed') {
      this.title = 'Re-open';
      return { statusId: 'Open', descr: 'Open' } as WhiteboardStatusLkup
    } else {
      this.title = 'Close';
      return { statusId: 'Closed', descr: 'Closed' } as WhiteboardStatusLkup
    }
  }

}
