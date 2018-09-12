import { Component, OnInit, Input, HostListener, ViewChild, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { MatExpansionPanel, MatExpansionPanelState } from '@angular/material';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss']
})
export class DocumentDetailComponent implements OnInit {
  @ViewChild(MatExpansionPanel) matExpansionPanel: MatExpansionPanel
  @Input() data: any;
  documentData$: Observable<any>;
  matExpansionPanelState: MatExpansionPanelState;

  constructor(
  ) { }

  ngOnInit() {
    this.documentData$ = this.data.documentData$;
  }

  getExpandedState(){
    this.matExpansionPanelState = this.matExpansionPanel._getExpandedState();
  }

}
