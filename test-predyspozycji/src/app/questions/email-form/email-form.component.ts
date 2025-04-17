import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../questions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResultsService } from '../../results/results.service';
import { CandidatesService } from '../../candidates/candidates.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { MailService } from '../../mail/mail.service';
import { StudyFieldsService } from '../../study-fields/study-fields.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog/dialog.component';
import { Answer } from '../answer.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.sass'
})
export class EmailFormComponent implements OnInit {

  kierunek!: number
  form!: FormGroup
  wynik!: number
  checkBox1Error: boolean = false;
  checkBox2Error: boolean = false;

  private candidateAnswers: Answer[] = [];

  constructor(private resultService: ResultsService, private candidateService: CandidatesService, private router: Router, 
    private studyFieldsService: StudyFieldsService, private mailService: MailService, private dialog: MatDialog, 
    private questionService: QuestionService, private snackBar: MatSnackBar) {}


  ngOnInit(): void {
    this.form = new FormGroup({
      "imie": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(20), Validators.minLength(2)]
      }),
      "nazwisko": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30), Validators.minLength(1)]
      }),
      "email": new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.email]
      }),
      "miasto": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30), Validators.minLength(1)]
      }),
      "zgoda-przetwarzania": new FormControl(false, {
        validators: [Validators.requiredTrue]
      }),
      "zgoda-marketing": new FormControl(false, {
        validators: [Validators.requiredTrue]
      })
    })
  }

  getResults() {

    if (this.form.invalid) {
      if (this.form.get('zgoda-przetwarzania')?.hasError('required')) {
        this.checkBox1Error = true;
      }
        
      if (this.form.get('zgoda-marketing')?.hasError('required')) {
        this.checkBox2Error = true;
      }
        
      return
    }

    this.checkBox1Error = false;
    this.checkBox2Error = false;
    this.candidateAnswers = this.questionService.answersToResult;

    this.candidateService.createCandidate(this.form.value.imie, this.form.value.nazwisko, this.form.value.email, this.form.value.miasto).subscribe({
      next: response => {
        const id_kandydata = response.id_kandydata;
        this.resultService.getResults(this.candidateAnswers).subscribe({
          next: response => {

            this.kierunek = response.kierunek;
            this.wynik = response.wynik

            this.resultService.addResult(id_kandydata, this.kierunek, this.wynik).subscribe({
              next: response => {
                this.studyFieldsService.getStudyField(this.kierunek).subscribe({
                  next: studyField => {
                    this.mailService.sendMail(this.form.value.imie, this.form.value.nazwisko, studyField.nazwa, this.form.value.email).subscribe({    
                      next: mailResponse => {
                        // const dialogRef = this.dialog.open(DialogComponent, { data: { message: response.message } })
                        const dialogRef = this.dialog.open(DialogComponent, { data: { message: mailResponse.message, url: mailResponse.url } })
                        dialogRef.afterClosed().subscribe({
                          next: () => {
                            localStorage.clear();
                            this.router.navigate(['/'])
                          },
                          error: () => {
                            this.snackBar.open('Nie udało się otworzyć okna dialogowego.', 'OK', { duration: 3000 });
                          }
                        })
                      },
                      error: error => {
                        this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
                      }
                    })
                    
                  },
                  error: error => {
                    this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
                  }
                })
                
              },
              error: error => {
                this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
              }
            })
          }, 
          error: error => {
            this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
          }
        })
      },
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
      }
    })

    
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Pole jest wymagane!';
    if (control.hasError('maxlength')) return `Wprowadzono za dużą ilość znaków. Maksymalna ilość znaków: ${control.errors?.['maxlength'].requiredLength}`;
    if (control.hasError('minlength')) return `Wprowadzono za małą ilość znaków. Minimalna ilość znaków: ${control.errors?.['minlength'].requiredLength}`;
    if (control.hasError('email')) return 'Niepoprawny format adresu email!';

    return '';
  }

}
