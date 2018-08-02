import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon-data',
  templateUrl: './icon-data.component.html',
  styleUrls: ['./icon-data.component.scss']
})
export class IconDataComponent implements OnInit {
  @Input() text;
  @Input() faIcon;
  @Input() detail;

  constructor() { }

  ngOnInit() {
  }

}
