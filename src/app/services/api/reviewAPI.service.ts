import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



import { Review, Whiteboard, ReviewUser } from '@models/test.model';

@Injectable()
export class ReviewAPI {
    review = {};
    Whiteboard = {};
    constructor(private http: HttpClient) { }

    getAllReviews(): Observable<any> {
        return this.http.get('http://localhost:8080/reviews');
    }

    editReview(id, data: object) {
        return this.http.put<Review>('http://localhost:8080/reviews/' + id, data);
    }

    saveReview(review: Review): Observable<Review> {
        return this.http.post<Review>('http://localhost:8080/reviews', review);
    }

    deleteReview(id, data: object): Observable<any> {
        return this.http.delete('http://localhost:8080/reviews/' + id, data);
    }

    getAllUsers(): Observable<any> {
        return this.http.get('http://localhost:8080/reviewUsers');
    }

    saveReviewUser(user: ReviewUser): Observable<ReviewUser> {
        return this.http.post<ReviewUser>('http://localhost:8080/reviewUsers/1', user);
    }

    getAllReviewDetails(): Observable<any> {
        return this.http.get('http://localhost:8080/reviewDetails');
    }

    editReviewUser( data: object) {
        return this.http.post<ReviewUser>('http://localhost:8080/reviewUsers/1', data);
    }

  // editReview(review: Review): Observable<string> {
  //   return this.http.put(`http://localhost:8080/reviews/${review._id}`, review, { responseType: 'text' });
  // }

}



