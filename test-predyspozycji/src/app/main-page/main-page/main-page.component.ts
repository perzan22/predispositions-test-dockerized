// Import potrzebnych zależności
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../questions/questions.service';

// Konfiguracja komponentu
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.sass'
})
// Klasa zaznaczona przez dekorator
export class MainPageComponent {

  // Konstruktor wywoływany po uruchomieniu komponentu
  constructor(private router: Router, private questionService: QuestionService) {}

  // Funkcja rozpoczynająca test
  startTest() {
    // Zmienia widok strony na podstronę /test
    this.router.navigate(['/test']);

    // Wyczyszczenie localStorage przeglądarki
    localStorage.clear();

    // Resetowanie wybranych odpowiedzi
    this.questionService.resetAnswers();
  }
}
