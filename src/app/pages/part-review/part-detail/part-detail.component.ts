import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-part-detail',
  templateUrl: './part-detail.component.html',
  styleUrls: ['./part-detail.component.scss']
})
export class PartDetailComponent implements OnInit {
  @Input() partData$: Observable<any>;
  public fixed = false;

  constructor() { }

  ngOnInit() {
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
    if (number > 10) {
      this.fixed = true;
    } else if (this.fixed && number < 1) {
      this.fixed = false;
    }
  }
}
