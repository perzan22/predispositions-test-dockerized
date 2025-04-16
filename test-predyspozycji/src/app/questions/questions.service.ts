import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Question } from './question.model';
import { Answer } from './answer.model';
import { Router } from '@angular/router';
import { QuestionType } from './questionType.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private answerApiUrl = 'http://localhost:3000/api/answers'
  private questionApiUrl = 'http://localhost:3000/api/questions'

  private questions: Question[] = []
  private questionSubs = new Subject<{ questions: Question[] }>
  private answers: Answer[] = []
  private answerSubs = new Subject<{ answers: Answer[] }>
  private questionTypes: QuestionType[] = [];
  private questionTypesSubs = new Subject<{ questionTypes: QuestionType[] }>

  answersToResult: Answer[] = []

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  // Funkcja zwracająca pytania z bazy danych
  getQuestions() {
    // Żądanie GET
    this.http.get<{ questions: any, message: string }>(`http://localhost:3000/api/questions/`).subscribe({
      // W przypadku powodzenia zwraca opytania do zmiennej i do subskrypcji obserwowanej w komponencie
      next: fetchedQuestions => {
        this.questions = fetchedQuestions.questions;
        this.questionSubs.next({ questions: [...this.questions] })
      },
      // W przypadku błędu pokazuje informacje
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
      }
    })
  }

  getQuestion(id_pytania: number) {
    return this.http.get<{ id_pytania: number, tresc: string, instrukcja: string, ilosc_odpowiedzi: number, id_typu: number }>(`${this.questionApiUrl}/edit?id_pytania=${id_pytania}`)
  }

  getAllAnswers() {
    this.http.get<{ answers: any, message: string }>(`${this.answerApiUrl}/all/`).subscribe({
      next: fetchedAnswers => {
        this.answers = fetchedAnswers.answers;
        this.answerSubs.next({ answers: [...this.answers] })
      },
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
      }
    })
  }

  getAnswers(id_pytania: number) {
    this.http.get<{ answers: any, message: string }>(`${this.answerApiUrl}?id_pytania=${id_pytania}`).subscribe({
      next: fetchedAnswers => {
        this.answers = fetchedAnswers.answers;
        this.answerSubs.next({ answers: [...this.answers] })
      }
    })
  }

  resetAnswers() {
    this.answersToResult = [];
  }

  editQuestion(tresc: string, instrukcja: string, ilosc_odpowiedzi: number, id_typu: number, questionID: number) {
    const questionData = {
      tresc: tresc,
      instrukcja: instrukcja,
      ilosc_odpowiedzi: ilosc_odpowiedzi,
      id_typu: id_typu
    }
    

    this.http.patch<{ question: Question, message: string }>(`http://localhost:3000/api/questions?id_pytania=${questionID}`, questionData).subscribe({
      next: editedQuestion => {
        this.snackBar.open(editedQuestion.message, 'OK', { duration: 3000 })
        this.router.navigate(['/admin/pytania'])
      },
      error: error => {
        console.log(error.message)
      }
    })
  }

  editAnswer(tresc: string, wartosc_punktowa: number, id_pytania: number, answerID: number) {
    const answerData = {
      tresc: tresc,
      wartosc_punktowa: wartosc_punktowa,
      id_pytania: id_pytania
    }
    

    this.http.patch<{ answer: Question, message: string }>(`${this.answerApiUrl}?id_odpowiedzi=${answerID}`, answerData).subscribe({
      next: editedAnswer => {
        this.snackBar.open(editedAnswer.message, 'OK', { duration: 3000 })
      },
      error: error => {
        console.log(error.message)
      }
    })
  }

  addNewAnswer(tresc: string, wartosc_punktowa: number, id_pytania: number) {
    const answerData = {
        tresc: tresc,
        wartosc_punktowa: wartosc_punktowa,
        id_pytania: id_pytania
      }
      
  
      this.http.post<{ answer: Answer, message: string }>(`${this.answerApiUrl}`, answerData).subscribe({
        next: createdAnswer => {
          this.snackBar.open(createdAnswer.message, 'OK', { duration: 3000 })
        },
        error: error => {
          console.log(error.message)
        }
      })
  }

  deleteAnswer(id_pytania: number, id_odpowiedzi: number) {
    return this.http.delete<{ answer: Answer, message: string }>(`${this.answerApiUrl}?id_odpowiedzi=${id_odpowiedzi}&id_pytania=${id_pytania}`);
  }

  addQuestion(tresc: string, instrukcja: string, typ_pytania: number) {
    const questionData = {
      tresc: tresc,
      instrukcja: instrukcja,
      typ_pytania: typ_pytania
    }

    return this.http.post<{ id_pytania: number }>(`${this.questionApiUrl}`, questionData)
  }

  getQuestionTypes() {
    this.http.get<{ questionTypes: QuestionType[], message: string }>(`${ this.questionApiUrl}/type`).subscribe({
      next: fetchedTypes => {
        this.questionTypes = fetchedTypes.questionTypes;
        this.questionTypesSubs.next({ questionTypes: [...this.questionTypes] })
      },
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
      }
    })
  }

  deleteQuestion(id_pytania: number) {
    return this.http.delete<{ question: Question, message: string }>(`${ this.questionApiUrl}?id_pytania=${id_pytania}`);
  }

  getQuestionUpdateListener() {
    return this.questionSubs.asObservable()
  }

  getAnswerUpdateListener() {
    return this.answerSubs.asObservable()
  }

  getQuestionTypesUpdateListener() {
    return this.questionTypesSubs.asObservable()
  }

  
  public set setAnswersToResult(v : Answer[]) {
    this.answersToResult = v;
  }
  
}
