import { Component, OnInit, Input, HostListener, ViewChild, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { MatExpansionPanel, MatExpansionPanelState } from '@angular/material';

@Component({
  selector: 'app-dashboard-notifications',
  templateUrl: './dashboard-notifications.component.html',
  styleUrls: ['./dashboard-notifications.component.scss']
})
export class DashboardNotificationsComponent implements OnInit {
  @ViewChild(MatExpansionPanel) matExpansionPanel: MatExpansionPanel;
  @Input() data: any;
  documentData$: Observable<any>;
  matExpansionPanelState: MatExpansionPanelState;

  constructor(
  ) { }

  ngOnInit() {
    this.documentData$ = this.data.documentData$;
  }

  getExpandedState() {
    this.matExpansionPanelState = this.matExpansionPanel._getExpandedState();
  }
  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const number = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
  //   if (number > 10) {
  //     this.fixed = true;
  //   } else if (this.fixed && number < 1) {
  //     this.fixed = false;
  //   }
  // }
}
