import { Component, OnInit, Input } from '@angular/core';
import { Part } from '@app/models/ars-app.models';

@Component({
  selector: 'app-part-item',
  templateUrl: './part-item.component.html',
  styleUrls: ['./part-item.component.scss']
})
export class PartItemComponent implements OnInit {
  item: Part;
  constructor() { }
  
  ngOnInit() {
  }

}
