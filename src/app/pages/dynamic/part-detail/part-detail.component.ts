import { Component, OnInit, Input, ViewChild, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { MatExpansionPanel, MatExpansionPanelState } from '@angular/material';

@Component({
  selector: 'app-part-detail',
  templateUrl: './part-detail.component.html',
  styleUrls: ['./part-detail.component.scss']
})
export class PartDetailComponent implements OnInit {
  @ViewChild(MatExpansionPanel) matExpansionPanel: MatExpansionPanel;
  @Input() data: any;
  partData$: Observable<any>;
  matExpansionPanelState: MatExpansionPanelState;

  constructor() { }

  ngOnInit() {
    this.partData$ = this.data.partData$;
  }

  getExpandedState() {
    this.matExpansionPanelState = this.matExpansionPanel._getExpandedState();
  }
}
