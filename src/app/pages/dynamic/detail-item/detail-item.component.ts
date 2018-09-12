import { Component, OnInit, Input } from '@angular/core';

/**
 * DetailItemComponent is used by all detail components for the displaying to individual details in a top fixed dropdown menu for specific review pages.
 * At the time of this comment they included document detail and part detail.
 */

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss']
})
export class DetailItemComponent implements OnInit {
  @Input() item;
  constructor() { }

  ngOnInit() {
  }

}
