///////////////////////////////
// SELECT QUESTION COMPONENT //
///////////////////////////////

// imports

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../questions.service';
import { Subscription } from 'rxjs';
import { Question } from '../question.model';
import { Answer } from '../answer.model';
import { MatSnackBar } from '@angular/material/snack-bar';

// component declaration

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

  // get questions and answers on component initialization

  ngOnInit(): void {
    this.currentQuestionIndex = 0;
    this.candidateAnswers = [];

    // get questions from service

    this.questionService.getQuestions();
    this.questionsSubs = this.questionService.getQuestionUpdateListener().subscribe({
      next: questionData => {

        // get answers to actual question from service

        this.questions = questionData.questions
        this.questionService.getAnswers(this.questions[this.currentQuestionIndex].id_pytania);
        this.answersSubs = this.questionService.getAnswerUpdateListener().subscribe({
          next: answerData => {
            this.answers = answerData.answers
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
  
  // method push chosen answers to answer array
  // and load next question after answer click

  nextQuestion(answer: Answer) {
    if (this.currentQuestionIndex < this.questions.length - 1) {

      // push chosen answer to array

      this.candidateAnswers.push(answer);

      // increment question index

      this.currentQuestionIndex++;

      // get answer of next question

      this.questionService.getAnswers(this.questions[this.currentQuestionIndex].id_pytania);
      this.answersSubs = this.questionService.getAnswerUpdateListener().subscribe({
        next: answerData => {
          this.answers = answerData.answers
        },
        error: error => {
          this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
        }
      })

      // if there isnt any next question
      // push last answer and navigate to 
      // contact form

    } else {
      this.candidateAnswers.push(answer)
      this.currentQuestionIndex++;
      this.questionService.answersToResult = this.candidateAnswers;
      localStorage.setItem('testCompleted', 'true');
      this.router.navigate(['/poznaj-wynik'])
    }
  }

  // method return letter to label answers in html

  getLetter(index: number): string {
    const letters = 'ABCDEF';
    return letters[index % letters.length]
  }

}
