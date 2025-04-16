import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { QuestionService } from '../../../questions/questions.service';
import { Question } from '../../../questions/question.model';
import { Answer } from '../../../questions/answer.model';
import { Subscription } from 'rxjs';
import { QuestionType } from '../../../questions/questionType.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.sass'
})
export class QuestionFormComponent implements OnInit {

  form!: FormGroup
  mode: string = 'create'
  questionID!: string | null
  question!: Question
  answers: Answer[] = []
  answerSubs!: Subscription
  questionTypes: QuestionType[] = [];
  questionTypeSubs!: Subscription;

  constructor(private route: ActivatedRoute, private questionService: QuestionService, private router: Router, private snackBar: MatSnackBar) {}

  get odpowiedzi(): FormArray {
    return this.form.get('odpowiedzi') as FormArray;
  }

  ngOnInit(): void {

    this.form = new FormGroup({
      "tresc_pytania": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(40)]
      }),
      "instrukcja": new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30)]
      }),
      "typ_pytania": new FormControl(null, {
        validators: [Validators.required]
      }),
      "odpowiedzi": new FormArray([])
    })

    this.questionService.getQuestionTypes();
    this.questionTypeSubs = this.questionService.getQuestionTypesUpdateListener().subscribe({
      next: questionTypeData => {
        this.questionTypes = questionTypeData.questionTypes
      },
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
      }
    })

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.questionID = paramMap.get('id')
        if (this.questionID) {
          this.questionService.getQuestion(+this.questionID).subscribe({
            next: questionData => {
              this.question = {
                id_pytania: questionData.id_pytania,
                tresc: questionData.tresc,
                instrukcja: questionData.instrukcja,
                ilosc_odpowiedzi: questionData.ilosc_odpowiedzi,
                typ: questionData.id_typu
              }
            
            this.form.patchValue({ 'tresc_pytania': this.question.tresc, 'instrukcja': this.question.instrukcja, 'typ_pytania': this.question.typ })
            },
            error: error => {
              this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
            }
          }
          
        )
          this.questionService.getAnswers(+this.questionID)
          this.answerSubs = this.questionService.getAnswerUpdateListener().subscribe({
            next: answersData => {
              this.answers = answersData.answers
              answersData.answers.forEach(answer => {
                const answerGroup = new FormGroup({
                  "id_odpowiedzi": new FormControl({ value: answer.id_odpowiedzi, disabled: true }),
                  "tresc_odpowiedzi": new FormControl(answer.tresc, [Validators.required, Validators.maxLength(60)]),
                  "wartosc": new FormControl(answer.wartosc_punktowa, [Validators.required, Validators.min(0), Validators.max(1)])
                });
                this.odpowiedzi.push(answerGroup)
              })
            },
            error: error => {
              this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
            }
          })
        }
      } else {
        this.mode = 'create'
      }
    })
  }

  addAnswer() {
    const answerGroup = new FormGroup({
      "id_odpowiedzi": new FormControl(null),
      "tresc_odpowiedzi": new FormControl(null, [Validators.required, Validators.maxLength(60)]),
      "wartosc": new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1)])
    })
    this.odpowiedzi.push(answerGroup)
  }

  sprawdz() {
    console.log(this.odpowiedzi.controls)
  }

  onSubmit() {
    if (this.mode == 'edit') {
      this.editQuestion()
    } else {
      this.addQuestion()
    }
  }

  editQuestion() {
    if (this.form.invalid) {
      this.snackBar.open('Niepoprawnie edytowano pytanie! Popraw formularz!', 'OK', { duration: 3000 })
      return
    }
    if (this.questionID) {
      this.questionService.editQuestion(this.form.value.tresc_pytania, this.form.value.instrukcja, this.odpowiedzi.length, this.form.value.typ_pytania ,+this.questionID);
    }
  }

  editAnswer(answer: any) {
    if (this.form.invalid) {
      return
    }

    if (this.questionID && answer.id_odpowiedzi) {
      this.questionService.editAnswer(answer.tresc_odpowiedzi, answer.wartosc, +this.questionID, answer.id_odpowiedzi);
    } else if (this.questionID && !answer.id_odpowiedzi) {
      this.questionService.addNewAnswer(answer.tresc_odpowiedzi, answer.wartosc, +this.questionID)
    }
  }

  onDeleteAnswer(answerID: number) {
    if (this.questionID && answerID) {
      this.questionService.deleteAnswer(+this.questionID, answerID).subscribe({
        next: deletedAnswer => {
          this.answers = this.answers.filter(answer => answer.id_odpowiedzi !== answerID);
          this.odpowiedzi.removeAt(this.odpowiedzi.length - 1);
          this.snackBar.open(deletedAnswer.message, 'OK', { duration: 3000 })
        },
        error: error => {
          this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
        }
      })
    } else {
      this.odpowiedzi.removeAt(this.odpowiedzi.length - 1);
    }
  }

  addQuestion() {

    if (this.odpowiedzi.length >= 2) {
      this.questionService.addQuestion(this.form.value.tresc_pytania, this.form.value.instrukcja, this.form.value.typ_pytania).subscribe({
        next: id_pytania => {
          const odpowiedzi = this.odpowiedzi.value.map((odp: any) => ({
            ...odp,
            id_pytania
          }));
          console.log(odpowiedzi)

          for (let odpowiedz of odpowiedzi) {
            this.questionService.addNewAnswer(odpowiedz.tresc_odpowiedzi, odpowiedz.wartosc, odpowiedz.id_pytania.id_pytania);
          }

          this.snackBar.open('Pytanie dodano pomyślnie!', 'OK', { duration: 3000 })
          this.router.navigate(['/admin']);
        },
        error: error => {
          this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
        }
      })
    }
    
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Pole jest wymagane!';
    if (control.hasError('maxlength')) return `Wprowadzono za dużą ilość znaków. Maksymalna ilość znaków: ${control.errors?.['maxlength'].requiredLength}`;
    if (control.hasError('minlength')) return `Wprowadzono za małą ilość znaków. Minimalna ilość znaków: ${control.errors?.['minlength'].requiredLength}`;

    return '';
  }

}
