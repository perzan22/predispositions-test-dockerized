/////////////////////////
// MAIN PAGE COMPONENT //
/////////////////////////

// imports

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../questions/questions.service';

// component declaration

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.sass'
})
export class MainPageComponent {

  constructor(private router: Router, private questionService: QuestionService) {}

  // on start button - start the test 

  startTest() {
    this.router.navigate(['/test']);

    localStorage.clear();

    this.questionService.resetAnswers();
  }
}
