/////////////////////////////
// QUESTION FORM COMPONENT //
/////////////////////////////

// imports

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { QuestionService } from '../../../questions/questions.service';
import { Question } from '../../../questions/question.model';
import { Answer } from '../../../questions/answer.model';
import { Subscription } from 'rxjs';
import { QuestionType } from '../../../questions/questionType.model';
import { MatSnackBar } from '@angular/material/snack-bar';

// component declaration

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

  // getters

  get odpowiedzi(): FormArray {
    return this.form.get('odpowiedzi') as FormArray;
  }

  // on component initialization
  // generate question form
  // define if it is creating new question or editing existing one

  ngOnInit(): void {

    // generate form

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

    // get question types

    this.questionService.getQuestionTypes();
    this.questionTypeSubs = this.questionService.getQuestionTypesUpdateListener().subscribe({
      next: questionTypeData => {
        this.questionTypes = questionTypeData.questionTypes
      },
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
      }
    })

    // check mode of form

    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      // if mode is edit then insert existing values to form fields of question
      // and answers

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

  // function add new question form group to form
  // html file shows blank form fields for it

  addAnswer() {
    const answerGroup = new FormGroup({
      "id_odpowiedzi": new FormControl(null),
      "tresc_odpowiedzi": new FormControl(null, [Validators.required, Validators.maxLength(60)]),
      "wartosc": new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1)])
    })
    this.odpowiedzi.push(answerGroup)
  }

  // method to log answers form group

  sprawdz() {
    console.log(this.odpowiedzi.controls)
  }

  // on submit edit question or add new based on mode

  onSubmit() {
    if (this.mode == 'edit') {
      this.editQuestion()
    } else {
      this.addQuestion()
    }
  }

  // send edited question data to service

  editQuestion() {
    if (this.form.invalid) {
      this.snackBar.open('Niepoprawnie edytowano pytanie! Popraw formularz!', 'OK', { duration: 3000 })
      return
    }
    if (this.questionID) {
      this.questionService.editQuestion(this.form.value.tresc_pytania, this.form.value.instrukcja, this.odpowiedzi.length, this.form.value.typ_pytania ,+this.questionID);
    }
  }

  // send edited answer data to service

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

  // on delete answer send data to service and remove one from formgroup so html file doesnt show it

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

  // method send new question data to service
  // and new answers data to service

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

  // function set custom error messages to question form

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) return 'Pole jest wymagane!';
    if (control.hasError('maxlength')) return `Wprowadzono za dużą ilość znaków. Maksymalna ilość znaków: ${control.errors?.['maxlength'].requiredLength}`;
    if (control.hasError('minlength')) return `Wprowadzono za małą ilość znaków. Minimalna ilość znaków: ${control.errors?.['minlength'].requiredLength}`;

    return '';
  }

}
