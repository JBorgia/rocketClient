import { Component, OnInit } from '@angular/core';
import { SearchPipe } from '@pipes/category.pipe';
import { OrderrByPipe } from '@pipes/orderBy.pipe';

// import { AuthenticationAPI } from '@services/api-request.service';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {



  reviews: Array<any>;
  isDesc = true;
  column = 'CategoryName';
  direction: number;
  constructor(
  ) { }

  ngOnInit() {
    this.reviews = [
      {
        'review': 'Spincraft AFT RP Dome',
        'partNum': '90122310552-006',
        'serialNum': '31124-213',
        'status': 'Ready',
        'type': 'PED',
        'mission': ' ',
        'location': 'Electronic',
        'opened': '05/25/2016',
        'closed': ' '
      },
      {
        'review': 'L3 Comm - OCU ',
        'partNum': '1F67700-1',
        'serialNum': '0034',
        'status': 'Ready',
        'type': 'PED',
        'mission': ' ',
        'location': 'Electronic',
        'opened': '05/25/2016',
        'closed': '04/01/2017'

      },
      {
        'review': 'NC Dynamics â€“ Launch/Ground Tie-Down Fitting ',
        'partNum': '90122310141-5019',
        'serialNum': '131',
        'status': 'In Progress',
        'type': 'PED',
        'mission': 'AV0076 ',
        'location': 'Electronic',
        'opened': '05/25/2016',
        'closed': '04/01/2017'
      },
      {
        'review': 'Marotta ',
        'partNum': '88-30915-039',
        'serialNum': '380-393',
        'status': 'Closed',
        'type': 'PED',
        'mission': ' Mission Name ',
        'location': 'Electronic',
        'opened': '05/25/2016',
        'closed': '04/01/2017'
      }
    ];

    // this.getReviews();
  }

  sort(property) {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  // getReviews() {
  //   this.reviewService.getReviews().subscribe(
  //     data => this.reviews = data,
  //     error => console.log(error),
  //   );
  // }

}
