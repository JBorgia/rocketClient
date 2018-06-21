import { Component, OnInit, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { PaginationService } from '@services/pagination.service';
import { WhiteboardAPI, ReviewAPI } from '@services/index';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserService } from '@services/user.service';

import { Review, Whiteboard } from '@models/test.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.scss'],
  providers: [DatePipe]
})
export class ReviewDetailsComponent implements OnInit {
  modalRef: BsModalRef;
  showUser = false;
  userName: any = 'Hide';
  showDetail = false;
  detailName: any = 'Hide';

  isDesc = true;
  column = 'CategoryName';
  direction: number;

  reviewDetails: Array<any>;
  reviews: Review[] = [];
  review = new Review();
  selectedReview: Review;
  Whiteboards: Whiteboard[] = [];
  Whiteboard = new Whiteboard();
  selectedWhiteboard: Whiteboard;
  isEditing = false;
  currentDate: number = Date.now();

  addReviewForm: FormGroup;
  documentName = new FormControl('', Validators.required);
  documentType = new FormControl('', Validators.required);
  assignTo = new FormControl('', Validators.required);
  reviewedBy = new FormControl('', Validators.required);
  reviewedDate = new FormControl('', Validators.required);
  reviewed = new FormControl(true, Validators.required);
  numberOfIssues = new FormControl('', Validators.required);
  comments = new FormControl('', Validators.required);


  addWhiteboardForm: FormGroup;
  id = new FormControl('', Validators.required);
  initiator = new FormControl('', Validators.required);
  document = new FormControl('', Validators.required);
  issues = new FormControl('', Validators.required);
  action = new FormControl('', Validators.required);
  assignToo = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  response = new FormControl('', Validators.required);
  openDate = new FormControl('', Validators.required);
  closedDate = new FormControl('', Validators.required);
  closedComment = new FormControl('', Validators.required);
  responseBy = new FormControl('', Validators.required);
  closedBy = new FormControl('', Validators.required);
  ridIssue = new FormControl('', Validators.required);

  constructor(
    private location: Location,
    private reviewService: ReviewAPI,
    private whiteboardAPI: WhiteboardAPI,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    public auth: UserService, private datePipe: DatePipe) {
    // this.review.reviewedBy = auth.getUserName();
    this.review.reviewedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm a');
    this.review.reviewed = true;
    this.Whiteboard.document = this.review.documentName;

  }

  ngOnInit() {
    this.whiteboardAPI.getAllWhiteboard().subscribe(data => {
      this.Whiteboards = data;
    });

    this.reviewService.getAllReviews().subscribe(data => {
      this.reviews = data;
    });

    this.reviewService.getAllReviewDetails().subscribe(data => {
      this.reviewDetails = data;
    });

    this.addReviewForm = this.formBuilder.group({
      documentName: this.documentName,
      documentType: this.documentType,
      assignTo: this.assignTo,
      reviewedBy: this.reviewedBy,
      reviewedDate: this.reviewedDate,
      reviewed: this.reviewed,
      numberOfIssues: this.numberOfIssues,
      comments: this.comments,
    });

    this.addWhiteboardForm = this.formBuilder.group({
      id: 2,
      initiator: this.Whiteboard.initiator = this.auth.getUserName(),
      document: this.Whiteboard.document = '1F67700-1 SN0034 ADP Rev-.pdf',
      issues: this.issues,
      action: this.action,
      assignToo: this.assignToo,
      status: this.status,
      response: this.response,
      openDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm a'),
      closedDate: this.closedDate,
      closedComment: this.closedComment,
      // responseBy: this.Whiteboard.responseBy = this.auth.getUserName(),
      closedBy: this.closedBy,
      ridIssue: this.ridIssue,

    });

  }

  saveReview() {
    this.reviewService.saveReview(this.addReviewForm.value).subscribe(result => {
      this.reviews.push(result);
    }, error => console.error(error));
  }

  editReview() {
    this.reviewService.editReview(this.selectedReview.id, this.review).subscribe(
      (review) => {

        // const index = this.reviews.findIndex(initiator => initiator.id === review.id);
        Object.keys(review).forEach(key => {
          if (review[key] !== null) {
            this.selectedReview[key] = review[key];
          }
        });

      },
      error => console.log(error)
    );
  }

  deleteReview() {
    this.reviewService.deleteReview(this.selectedReview.id, this.review).subscribe(
      () => {
        console.log('this is selected', this.selectedReview.id);
        const pos = this.reviews.map(elem => elem.id).indexOf(this.review.id);
        this.reviews.splice(pos, 1);
      },
      error => console.log(error)
    );
  }

  saveWhiteboard() {
    this.whiteboardAPI.saveWhiteboard(this.addWhiteboardForm.value).subscribe(result => {
      this.Whiteboards.push(result);
      this.addWhiteboardForm.reset();
      console.log('this is white', this.Whiteboards);

    }, error => console.error(error));
  }

  editWhiteboard() {
    this.whiteboardAPI.editWhiteboard(this.Whiteboard.id, this.Whiteboard).subscribe(
      (whiteboard) => {
        console.log('this is selectedWhiteboard', this.Whiteboard.id);

        // const index = this.Whiteboards.findIndex(initiator => initiator.id === Whiteboard.id);
        Object.keys(Whiteboard).forEach(key => {
          if (Whiteboard[key] !== null) {
            this.selectedWhiteboard[key] = Whiteboard[key];
          }
        });

      },
      error => console.log(error)
    );
  }


  openModal(template: TemplateRef<any>, review) {
    this.selectedReview = review;
    this.modalRef = this.modalService.show(template);
  }

  showModal(templateTwo: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateTwo);
  }

  responseModal(templateThree: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateThree);
  }

  supportModal(templateFour: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateFour);
  }
  closeReviewModal(templateFive: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templateFive);
  }


  toggle() {
    this.showUser = !this.showUser;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.showUser) {
      this.userName = 'Show';
    } else {
      this.userName = 'Hide';
    }
  }

  toggleDetail() {
    this.showDetail = !this.showDetail;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.showDetail) {
      this.detailName = 'Show';
    } else {
      this.detailName = 'Hide';
    }
  }

  sort(property) {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  closeReview() {
    if (this.Whiteboard.status = 'open') {
      alert('There is currently atleast one active');
    }
  }

  navigateBack() {
      this.location.back();
  }
}


