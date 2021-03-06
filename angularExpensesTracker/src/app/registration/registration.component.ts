import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { AuthService } from '../core/auth.service';


@Component({
  selector: 'exp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  public signUpForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.signUpForm = this._formBuilder.group({
      username: ['', Validators.required],
      first_name: [''],
      last_name: [''],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    });
  }

  public validStatus(control: AbstractControl) {
    return control.invalid && control.touched && control.dirty;
  }

  public signUp() {
    if (this.signUpForm.get('password').value !== this.signUpForm.get('password2').value) {
      this.signUpForm.get('password2').setErrors({equals: false});
    } else if (this.signUpForm.valid) {
       this._authService.signUp(this.signUpForm.getRawValue())
        .pipe(take(1))
        .subscribe(() => this._router.navigate(['/']));
    } else {
      Object.keys(this.signUpForm.controls).forEach((key) => {
        this.signUpForm.get(key).markAsTouched();
        this.signUpForm.get(key).markAsDirty();
      });
    }

  }

  public generateErrors(name: string) {
    const control = this.signUpForm.get(name);
    let errorsDescription = [];

    if (control.invalid) {
      Object.keys(control.errors).forEach((key: string) => {
        switch (key) {
          case 'email': errorsDescription.push('Incorrect email!'); break;
          case 'required': errorsDescription.push(`${name} required!`); break;
          case 'equals': errorsDescription.push('Password and confirm password not equals!'); break;
        }
      });
    }

    return errorsDescription;
  }

}
