import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-whiteboard-display',
  templateUrl: './whiteboard-display.component.html',
  styleUrls: ['./whiteboard-display.component.scss']
})
export class WhiteboardDisplayComponent implements OnInit {
  @Input() whiteboard;

  constructor() { }

  ngOnInit() {
  }

}
