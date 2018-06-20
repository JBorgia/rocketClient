import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { WhiteboardAPI } from '@services/index';

import { Review, Whiteboard } from '@models/test.model';
@Component({
  selector: 'app-whiteboard',
  templateUrl: './Whiteboard.component.html',
  styleUrls: ['./Whiteboard.component.scss']
})
export class WhiteboardComponent implements OnInit {
  whiteboards: Array<any>;

  constructor(
    private whiteboardAPI: WhiteboardAPI
  ) { }

  ngOnInit() {
    this.whiteboardAPI.getAllWhiteboard().subscribe(data => {
      this.whiteboards = data;
      console.log(this.whiteboards, 'here');

    });
  }

}
