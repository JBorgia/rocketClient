import { Component, OnInit } from '@angular/core';
import { WhiteboardIssueAPI } from '@services/index';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './Whiteboard.component.html',
  styleUrls: ['./Whiteboard.component.scss']
})
export class WhiteboardComponent implements OnInit {
  whiteboards: Array<any>;

  constructor(
    private whiteboardAPI: WhiteboardIssueAPI
  ) { }

  ngOnInit() {
    this.whiteboardAPI.getAll().subscribe(data => {
      this.whiteboards = data;
      console.log(this.whiteboards, 'here');

    });
  }

}
