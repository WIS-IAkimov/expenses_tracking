import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { RegistrationService } from './registration.service';

@Component({
  selector: 'exp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [ RegistrationService ]
})
export class RegistrationComponent implements OnInit {

  public signUpForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _registrationService: RegistrationService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.signUpForm = this._formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  public signUp() {
    if (this.signUpForm.get('password').value !== this.signUpForm.get('confirmPassword').value) {
      this.signUpForm.get('confirmPassword').setErrors([{equals: false}]);
    } else {
      this.signUpForm.valid && this._registrationService.signUp(this.signUpForm.getRawValue())
        .pipe(take(1))
        .subscribe(() => this._router.navigate(['/']));
    }
  }

  public generateErrors(name: string) {
    const control = this.signUpForm.get(name);
    let errorsDescription = [];

    if (control.invalid && control.touched) {
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
