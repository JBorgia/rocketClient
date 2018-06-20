import { Component, OnInit } from '@angular/core';
import { SearchPipe } from '@pipes/category.pipe';
import { OrderrByPipe } from '@pipes/orderBy.pipe';

import { REVIEW_TEST_DATA } from './test-data';
// import { AuthenticationAPI } from '@services/api-request.service';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  reviewData: Array<any>;
  isDesc = true;
  column = 'CategoryName';
  direction: number;
  constructor(
  ) { }

  ngOnInit() {
    this.reviewData = REVIEW_TEST_DATA;

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
