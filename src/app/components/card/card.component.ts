import { Component, Input, OnInit } from '@angular/core';
import { PlusMinusComponent } from '@app/components/plus-minus/plus-minus.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  private _isCollapsible = false;
  private _isCollapsed = '';
  constructor() {}

  ngOnInit() {}

  /**
   * `set` function to set whether card is collapsible.  Defaults to `false`
   */
  @Input() set isCollapsible(isCollapsible: boolean) {
    this._isCollapsible = isCollapsible;
  }
  /**
   * Get whether the card is collapsible
   *
   * @returns {boolean}
   */
  get isCollapsible(): boolean {
    return this._isCollapsible;
  }

  /**
   * `set` function to set whether card is collapsed.  Defaults to `false`
   */
  @Input() set isCollapsed(isCollapsed: string) {
    this._isCollapsed = isCollapsed;
  }
  /**
   * Get whether the card is collapsible. Default is ''
   *
   * @returns {string}
   */
  get isCollapsed(): string {
    return this._isCollapsed;
  }

  toggle(): void {
    if (this.isCollapsible) {
      this.isCollapsed = this.isCollapsed === 'collapsed' ? '' : 'collapsed';
    }
  }
}
