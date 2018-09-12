import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



import { ArsUser } from '@models/ars-app.models';

@Injectable()
export class ReviewAPI {
    review = {};
    constructor(private http: HttpClient) { }

    getAllReviews(): Observable<any> {
        return this.http.get('http://localhost:8080/reviews');
    }

    editReview(id, data: object) {
        return this.http.put<any>('http://localhost:8080/reviews/' + id, data);
    }

    saveReview(review: any): Observable<any> {
        return this.http.post<any>('http://localhost:8080/reviews', review);
    }

    deleteReview(id, data: object): Observable<any> {
        return this.http.delete('http://localhost:8080/reviews/' + id, data);
    }


    // DELETE EVERYTHING BELOW THIS LINE
    getAllUsers(): Observable<any> {
        return this.http.get('http://localhost:8080/reviewUsers');
    }

    saveReviewUser(user: ArsUser): Observable<ArsUser> {
        return this.http.post<ArsUser>('http://localhost:8080/reviewUsers/1', user);
    }

    getAllReviewDetails(): Observable<any> {
        return this.http.get('http://localhost:8080/reviewDetails');
    }

    editReviewUser( data: object) {
        return this.http.post<ArsUser>('http://localhost:8080/reviewUsers/1', data);
    }

  // editReview(review: Review): Observable<string> {
  //   return this.http.put(`http://localhost:8080/reviews/${review._id}`, review, { responseType: 'text' });
  // }

}



