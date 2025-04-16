import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../questions.service';
import { Subscription } from 'rxjs';
import { Question } from '../question.model';
import { Answer } from '../answer.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-select-question',
  templateUrl: './select-question.component.html',
  styleUrl: './select-question.component.sass'
})
export class SelectQuestionComponent implements OnInit {
  questions: Question[] = []

  answers: Answer[] = []
  candidateAnswers: Answer[] = [];
  
  private questionsSubs!: Subscription
  private answersSubs!: Subscription


  currentQuestionIndex: number = 0;


  constructor(private router: Router, private questionService: QuestionService, private snackBar: MatSnackBar) {}

  
  // Funkcja uruchamiana po zainicjowaniu komponentu
  ngOnInit(): void {
    // Wyzerowanie pytań i odpowiedzi
    this.currentQuestionIndex = 0;
    this.candidateAnswers = [];

    // Zwrócenie do serwisu pytań
    this.questionService.getQuestions();
    // Przekazanie pytań do komponentu za pomocą observable
    this.questionsSubs = this.questionService.getQuestionUpdateListener().subscribe({
      // Wykonywane jeśli nie ma błędu
      next: questionData => {
        // Wypełnienie tabeli questions danymi z serwisu
        this.questions = questionData.questions
        // Zwrócenie do serwisu odpowiedzi do pytania o indeksie currentQuestionIndex
        this.questionService.getAnswers(this.questions[this.currentQuestionIndex].id_pytania);
        // Przekazanie odpowiedzi do komponentu za pomocą observable
        this.answersSubs = this.questionService.getAnswerUpdateListener().subscribe({
          // Wykonane jeśli nie ma błedu
          next: answerData => {
            // Wypełnienie tabeli answer danymi z serwisu
            this.answers = answerData.answers
          },
          // W przypadku błedu związanego z odopowiedziami
          error: error => {
            // Zwraca informacje o błędzie
            this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
          }
        })
      },
      // W przypadku błedu związanego z pytaniami
      error: error => {
         // Zwraca informacje o błędzie
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
      }
    })
  }
  

  nextQuestion(answer: Answer) {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.candidateAnswers.push(answer);
      this.currentQuestionIndex++;
      this.questionService.getAnswers(this.questions[this.currentQuestionIndex].id_pytania);
      this.answersSubs = this.questionService.getAnswerUpdateListener().subscribe({
        next: answerData => {
          this.answers = answerData.answers
        },
        error: error => {
          this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
        }
      })
    } else {
      this.candidateAnswers.push(answer)
      this.currentQuestionIndex++;
      this.questionService.answersToResult = this.candidateAnswers;
      localStorage.setItem('testCompleted', 'true');
      this.router.navigate(['/poznaj-wynik'])
    }
  }

  getLetter(index: number): string {
    const letters = 'ABCD';
    return letters[index % letters.length]
  }

}
