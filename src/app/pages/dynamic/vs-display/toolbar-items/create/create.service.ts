import { Injectable } from '@angular/core';

import { ModalComponent } from '@app/components/modal/modal.component';
import { MatDialog } from '@angular/material';
import { CreateWhiteboardIssueFormComponent, AddUserFormComponent, CreateMessageFormComponent, CreateWhiteboardNoteFormComponent } from '@app/forms';
import { VsData } from '@app/pages/dynamic/vs-display/vs-data-object';
import { Observable } from 'rxjs';

@Injectable()
export class CreateService {
    review;
    wbTitle;

    componentClassMapper = {
        whiteboardIssue: CreateWhiteboardIssueFormComponent,
        whiteboardNote: CreateWhiteboardNoteFormComponent,
        user: AddUserFormComponent,
        message: CreateMessageFormComponent
    }

    componentTitleMapper = {
        whiteboardIssue: 'New Whiteboard',
        user: 'Select User to Add',
        message: 'New Message',
        whiteboardNote: `New Whiteboard Note` 
    }

    constructor(
        private dialog: MatDialog,
    ) { }

    openForm(data: VsData): Observable<any> {
        const dialogRef = this.dialog.open(ModalComponent, {
            data: {
                componentClass: this.componentClassMapper[data.vsObject.type],
                title: this.componentTitleMapper[data.vsObject.type],
                ...data,
            },
        });
        return dialogRef.afterClosed();
    }
}

