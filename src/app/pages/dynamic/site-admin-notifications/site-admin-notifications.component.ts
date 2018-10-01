import { Component, OnInit, Input, ViewChild, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { MatExpansionPanel, MatExpansionPanelState } from '@angular/material';

@Component({
  selector: 'app-site-admin-notifications',
  templateUrl: './site-admin-notifications.component.html',
  styleUrls: ['./site-admin-notifications.component.scss']
})
export class SiteAdminNotificationsComponent implements OnInit {
  @ViewChild(MatExpansionPanel) matExpansionPanel: MatExpansionPanel;
  @HostBinding('style.flex') flex: string;
  @Input() data: any;
  documentData$: Observable<any>;
  matExpansionPanelState: MatExpansionPanelState;

  constructor(
  ) { }

  ngOnInit() {
    if(this.data.style){ this.flex = this.data.style.flex }
    this.documentData$ = this.data.documentData$;
  }

  getExpandedState(){
    this.matExpansionPanelState = this.matExpansionPanel._getExpandedState();
  }
}
