import { Component, OnInit } from '@angular/core';

import { REVIEW_TEST_DATA } from './test-data';
// import { AuthenticationAPI } from '@services/api-request.service';
import { Observable, of } from 'rxjs';
import { EditComponent } from '@components/edit/edit.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  reviewData: Observable<any[]>;
  componentTitle = 'Review';
  componentClass = EditComponent;
  isDesc = true;
  column = 'CategoryName';
  direction: number;
  constructor() {}

  ngOnInit() {
    this.reviewData = of(REVIEW_TEST_DATA);
    // this.getReviews();
  }

  sort(property) {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  tableEvents(value: Event): void {
    if (value) {
      console.log(value);
    }
  }

  // getReviews() {
  //   this.reviewService.getReviews().subscribe(
  //     data => this.reviews = data,
  //     error => console.log(error),
  //   );
  // }
}
