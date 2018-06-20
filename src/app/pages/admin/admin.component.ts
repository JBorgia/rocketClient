import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { AdminService } from '@services/admin.service';
import { UserAPI } from '@services/api/userAPI.service'

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { User } from '@models/user.model';
import { HcmList } from '@models/test.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  user = new User();
  hcmLists: HcmList[] = [];
  modalRef: BsModalRef;

  addUserForm: FormGroup;
  userId = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  company = new FormControl('', Validators.required);
  supplierName = new FormControl('', Validators.required);
  supplierCode = new FormControl('', Validators.required);
  team = new FormControl('', Validators.required);
  roleName = new FormControl('', Validators.required);

  constructor(
    private userServie: UserService,
    private userAPI: UserAPI,
    private adminService: AdminService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userServie.getAllUsers().subscribe(data => {
      this.users = data;
    });

    console.log('this is employee id', this.userAPI.getEmployeeId());
    this.adminService.getAllHcm().subscribe(data => {
      this.hcmLists = data;
    });

    // Let's combine the initiation and validation of form fields
    this.addUserForm = this.formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      company: this.company,
      supplierName: this.supplierName,
      supplierCode: this.supplierCode,
      team: this.team,
      roleName: this.roleName,
    });
  }

  saveUser() {
    this.userServie.saveUser(this.addUserForm.value).subscribe(result => {
      this.users.push(result);
    }, error => console.error(error));
  }


}


