/////////////////////
// LOGIN COMPONENT //
/////////////////////

// imports

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

// component declaration

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit{

  form!: FormGroup

  constructor(private authService: AuthService) {}

  // generate login form on component initialization

  ngOnInit(): void {
    
    this.form = new FormGroup({
      "login": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(20)]
      }),
      "password": new FormControl(null, {
        validators: [Validators.required]
      })
    })
  }

  // on login button send fields values to service

  onLogin() {
    if (this.form.invalid) {
      return
    }

    this.authService.login(this.form.value.login, this.form.value.password)
  }

  // function set custom error messages to login form

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Pole jest wymagane!';
    if (control.hasError('maxlength')) return `Wprowadzono za dużą ilość znaków. Maksymalna ilość znaków: ${control.errors?.['maxlength'].requiredLength}`;
    if (control.hasError('minlength')) return `Wprowadzono za małą ilość znaków. Minimalna ilość znaków: ${control.errors?.['minlength'].requiredLength}`;

    return '';
  }



}
