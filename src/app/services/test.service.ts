import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Review } from '@models/test.model';

@Injectable()
export class TestService {
  review = {};
  constructor(private http: HttpClient) {}

  getAllReviews(): Observable<any> {
      return this.http.get('http://localhost:8080/reviews');
  }

  getAllReviewDetails(): Observable<any> {
    return this.http.get('http://localhost:8080/reviewDetails');
  }

  getReview(id) {
    this.http.get('http://localhost:8080/reviews' + id).subscribe(data => {
      this.review = data;
    });
  }

  saveReview(review: Review): Observable<Review> {
    return this.http.post<Review>('http://localhost:8080/reviews', review);
  }

  // editReview(review: Review) {
  //   console.log(review._id);
  //   return this.http.put<Review>('http://localhost:8080/reviews/' + review._id, review );
  // }

  // editReview(review: Review): Observable<string> {
  //   return this.http.put(`http://localhost:8080/reviews/${review._id}`, review, { responseType: 'text' });
  // }

}
