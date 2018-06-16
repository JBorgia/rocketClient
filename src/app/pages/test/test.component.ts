import { Component, OnInit, TemplateRef } from '@angular/core';
import { PaginationService } from '@services/pagination.service';
import { TableData } from './dummy-data';
import { TestService } from '@services/test.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserService } from '@services/user.service';

import { Review } from '@models/test.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  modalRef: BsModalRef;

  reviewDetails: Array<any>;
  review = new Review();
  reviews: Review[] = [];
  isEditing = false;


  addTestForm: FormGroup;
  documentName = new FormControl('', Validators.required);
  documentType = new FormControl('', Validators.required);
  assignTo = new FormControl('', Validators.required);
  reviewedBy = new FormControl('', Validators.required);
  reviewedDate = new FormControl('', Validators.required);
  reviewed = new FormControl('', Validators.required);
  numberOfIssues = new FormControl('', Validators.required);
  comments = new FormControl('', Validators.required);

  constructor(private testService: TestService,
     private formBuilder: FormBuilder,
    private modalService: BsModalService,
    public auth: UserService) { }

  ngOnInit() {
    this.testService.getAllReviews().subscribe(data => {
      this.reviews = data;
      console.log(this.reviews, 'here');

    });


    this.testService.getAllReviewDetails().subscribe(data => {
      this.reviewDetails = data;
    });

    this.addTestForm = this.formBuilder.group({
      documentName: this.documentName,
      documentType: this.documentType,
      assignTo: this.assignTo,
      reviewedBy: this.reviewedBy,
      reviewedDate: this.reviewedDate,
      reviewed: this.reviewed,
      numberOfIssues: this.numberOfIssues,
      comments: this.comments,
    });

  }

  saveReview() {
    this.testService.saveReview(this.addTestForm.value).subscribe(result => {
      console.log(this.addTestForm);
      this.reviews.push(result);
      }, error => console.error(error));
  }

  // editReview(review) {
  //   console.log('this is id', review);
  //   this.testService.editReview(review).subscribe(
  //     () => {
  //       this.review = review;
  //     },
  //     error => console.log(error)
  //   );
  // }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
