import { Component, OnInit, Input, HostListener, ViewChild, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { MatExpansionPanel, MatExpansionPanelState } from '@angular/material';

@Component({
  selector: 'app-site-admin-messages',
  templateUrl: './site-admin-messages.component.html',
  styleUrls: ['./site-admin-messages.component.scss']
})
export class SiteAdminMessagesComponent implements OnInit {
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
