import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

import { UserModel, Role } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'exp-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public userForm: FormGroup;
  public roles: string[];

  private _id: string;

  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
  ) {
    this.roles = [];
    Object.keys(Role).forEach((key: string) => {
      this.roles.push(Role[key]);
    })
  }

  ngOnInit() {
    this.initForm();
    this.getUrlParams();
    this.getUser();
  }

  public save() {
    if (this.userForm.valid) {
      this.updateUser();
    } else {
      Object.keys(this.userForm.controls).forEach((key) => {
        this.userForm.get(key).markAsTouched();
        this.userForm.get(key).markAsDirty();
      });
    }
  }

  public reset() {
    this.updateForm(this._userService.selectedUser$);
  }

  public validStatus(control: FormControl) {
    return control.invalid && control.touched && control.dirty;
  }

  public generateErrors(name: string) {
    const control = this.userForm.get(name);
    let errorsDescription = [];

    if (control.invalid) {
      Object.keys(control.errors).forEach((key: string) => {
        switch (key) {
          case 'required': errorsDescription.push(`${name} required!`); break;
        }
      });
    }

    return errorsDescription;
  }

  private initForm() {
    this.userForm = this._formBuilder.group({
      id: [''],
      username: ['', Validators.required],
      first_name: [''],
      last_name: [''],
      role: ['', Validators.required]
    });
  }

  private getUrlParams() {
    this._id = this._route.snapshot.params.id;
  }

  private getUser() {
    this.updateForm(this._userService.getUser(+this._id));
  }


  private updateUser() {
    this.updateForm(this._userService.updateUser(new UserModel(this.userForm.getRawValue())));
  }

  private updateForm(user$: Observable<UserModel>) {
    user$
      .pipe(take(1))
      .subscribe((user: UserModel) => {
        this.userForm.patchValue(new UserModel(user));
      });
  }

}
