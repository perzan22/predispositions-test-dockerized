import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FormAccessGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const testCompleted = localStorage.getItem('testCompleted') === 'true';

    if (!testCompleted) {
      this.router.navigate(['']); // Przekierowanie do testu
      return false;
    }

    return true; // Umożliwia wejście na stronę formularza
  }
}