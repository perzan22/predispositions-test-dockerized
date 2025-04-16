import { Component } from '@angular/core';
import { QuestionService } from '../../../questions/questions.service';
import { Subscription } from 'rxjs';
import { Question } from '../../../questions/question.model';
import { Answer } from '../../../questions/answer.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-question-select',
  templateUrl: './question-select.component.html',
  styleUrl: './question-select.component.sass'
})
export class QuestionSelectComponent {

  questions: Question[] = []
  answers: Answer[] = []
  questionSeleceted!: Question | undefined
    
  private questionsSubs!: Subscription
  private answersSubs!: Subscription

  constructor(private questionService: QuestionService, private snackBar: MatSnackBar) {}


  ngOnInit(): void {
    this.questionService.getQuestions();
    this.questionsSubs = this.questionService.getQuestionUpdateListener().subscribe({
      next: questionData => {
        this.questions = questionData.questions
      },
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
      }
    })
  }

  onDeleteQuestion(id_pytania: number) {
    this.questionService.deleteQuestion(id_pytania).subscribe({
      next: deletedQuestion => {
        this.questions = this.questions.filter(question => question.id_pytania !== id_pytania)
        this.snackBar.open(deletedQuestion.message, 'OK', { duration: 3000 })
      },
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
      }
    })
  }


}
