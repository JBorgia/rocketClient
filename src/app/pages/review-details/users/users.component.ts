import { Component, OnInit, TemplateRef } from '@angular/core';
import { PaginationService } from '@services/pagination.service';
import { ReviewAPI } from '@services/api/reviewAPI.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserService } from '@services/user.service';
import { Review, Whiteboard, ReviewUser } from '@models/test.model';
import { SearchPipe } from '@pipes/category.pipe';
import { OrderrByPipe } from '@pipes/orderBy.pipe';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // Array of all items
  allItems: any = [];
  // Pagination object
  pagination: any = {};

  // Paged items
  pagedItems: any[];

  isDesc = true;
  column = 'CategoryName';
  direction: number;

  reviewUsers: Array<any>;
  user = new ReviewUser();
  selectedUser: ReviewUser;
  users: ReviewUser[] = [];
  isEditing = false;

  addUserForm: FormGroup;
  id = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  company = new FormControl('', Validators.required);
  team = new FormControl('', Validators.required);
  technology = new FormControl('', Validators.required);
  role = new FormControl('', Validators.required);

  constructor(private reviewService: ReviewAPI, private formBuilder: FormBuilder,
     private paginationService: PaginationService) { }

  ngOnInit() {
    this.reviewService.getAllUsers().subscribe(data => {
      this.reviewUsers = data;
      this.allItems = this.reviewUsers;   // Load data into allItems
      this.setPage(1);        // Initialize to page 1

    });

    this.addUserForm = this.formBuilder.group({
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      company: this.company,
      team: this.team,
      technology: this.technology,
      role: this.role,
    });
  }

  enableEditing(user: ReviewUser) {
    this.isEditing = true;
    this.user = user;
  }

  saveReviewUser() {
    this.reviewService.saveReviewUser(this.addUserForm.value).subscribe(result => {
      this.reviewUsers.push(result);
    }, error => console.error(error));
  }

  cancelEditing() {
    this.isEditing = false;
    this.user = new ReviewUser();
    this.reviewService.getAllUsers();
  }

  editReviewUser(user: ReviewUser) {
    this.reviewService.editReviewUser(this.selectedUser).subscribe(
      () => {
        this.isEditing = false;
        this.user = user;
      },
      error => console.log(error)
    );
  }

  // deleteUser(user: ReviewUser) {
  //   if (window.confirm('Are you sure you want to permanently delete this item?')) {
  //     this.reviewService.deleteUser(user).subscribe(
  //       () => {
  //         const pos = this.users.map(elem => elem.id).indexOf(user.id);
  //         this.users.splice(pos, 1);
  //       },
  //       error => console.log(error)
  //     );
  //   }
  // }

  sort(property) {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pagination.totalPages) {
      return;
    }

    // Get pagination object from service
    this.pagination = this.paginationService.getPagination(this.allItems.length, page);

    // Get current page of items
    this.pagedItems = this.allItems.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
  }

}
