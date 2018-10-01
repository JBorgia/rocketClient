import { Component, OnInit, Input, HostListener, ViewChild, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { MatExpansionPanel, MatExpansionPanelState, MatDialog } from '@angular/material';
import { SelectEmployeeFormComponent } from '@app/forms';
import { Type } from '@angular/compiler/src/core';
import { faUser, faUserPlus, faUserMd, faUserMinus, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

interface Tool {
  title;
  icon;
  tooltip;
  modalTitle;
  modalClass;
}

@Component({
  selector: 'app-admin-tools-detail',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.scss']
})
export class AdminToolsComponent implements OnInit {
  @ViewChild(MatExpansionPanel) matExpansionPanel: MatExpansionPanel
  @Input() data: any;
  documentData$: Observable<any>;
  matExpansionPanelState: MatExpansionPanelState;

  adminTools: Tool[] = [
    {
      title: 'Add User',
      icon: faUserPlus,
      tooltip: 'Select/Create New User',
      modalTitle: 'Select Employee',
      modalClass: SelectEmployeeFormComponent
    },
    // {
    //   title: 'Remove User',
    //   icon: faUserMinus,
    //   tooltip: 'Remove/Deactivate Existing User',
    //   modalTitle: 'Select Employee',
    //   modalClass: SelectEmployeeFormComponent
    // },
    // {
    //   title: 'Indotrinate User',
    //   icon: faUserMd,
    //   tooltip: 'Bestow Upon a User a PHd',
    //   modalTitle: 'Select Employee',
    //   modalClass: SelectEmployeeFormComponent
    // },
    // {
    //   title: 'Launch User',
    //   icon: faUserAstronaut,
    //   tooltip: 'Send a User into Space',
    //   modalTitle: 'Select Employee',
    //   modalClass: SelectEmployeeFormComponent
    // },
  ]

  constructor(
  ) { }

  ngOnInit() {
  }

  getExpandedState() {
    this.matExpansionPanelState = this.matExpansionPanel._getExpandedState();
  }

  closeExpansionPanel() {
    this.matExpansionPanel.close();
  }
}
