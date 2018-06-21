import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-plus-minus',
  templateUrl: './plus-minus.component.html',
  styleUrls: ['./plus-minus.component.scss']
})
export class PlusMinusComponent implements OnInit {
  private _isCollapsed;
  constructor() { }

  ngOnInit() {
  }

  /**
   * `set` function to set whether card is collapsible.  Defaults to `false`
   */
  @Input() set isCollapsed(isCollapsed: boolean) {
    console.log(isCollapsed);
    this._isCollapsed = isCollapsed;
  }
  /**
   * Get whether the card is collapsible
   *
   * @returns {boolean}
   */
  get isCollapsed(): boolean {
    return this._isCollapsed;
  }
}
