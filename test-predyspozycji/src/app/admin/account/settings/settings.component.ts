import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.sass'
})
export class SettingsComponent implements OnInit {

  formPass!: FormGroup;
  formAdd!: FormGroup;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.formPass = new FormGroup({
      "aktualne": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(40)]
      }),
      "nowe": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30)]
      })
    })
    this.formAdd = new FormGroup({
      "login": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(40)]
      }),
      "haslo": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30)]
      }),
      "hasloPotwierdz": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30)]
      })
    })
  }

  onSubmitPass() {
    if (this.formPass.invalid) {
      return;
    }

    this.authService.changePassword(this.formPass.value.aktualne, this.formPass.value.nowe)
  }

  onSubmitAdd() {
    if (this.formAdd.invalid) {
      return;
    }

    if (this.formAdd.value.haslo === this.formAdd.value.hasloPotwierdz) {
      this.authService.addNewAdmin(this.formAdd.value.login, this.formAdd.value.haslo);
    } else {
      this.snackBar.open('Nie dodano nowego admina. Hasła są różne!', 'OK', { duration: 3000 })

    }

    
  }

  getErrorMessagePass(controlName: string): string {
    const control = this.formPass.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Pole jest wymagane!';
    if (control.hasError('maxlength')) return `Wprowadzono za dużą ilość znaków. Maksymalna ilość znaków: ${control.errors?.['maxlength'].requiredLength}`;
    if (control.hasError('minlength')) return `Wprowadzono za małą ilość znaków. Minimalna ilość znaków: ${control.errors?.['minlength'].requiredLength}`;

    return '';
  }

  getErrorMessageAdd(controlName: string): string {
    const control = this.formAdd.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Pole jest wymagane!';
    if (control.hasError('maxlength')) return `Wprowadzono za dużą ilość znaków. Maksymalna ilość znaków: ${control.errors?.['maxlength'].requiredLength}`;
    if (control.hasError('minlength')) return `Wprowadzono za małą ilość znaków. Minimalna ilość znaków: ${control.errors?.['minlength'].requiredLength}`;

    return '';
  }

}
