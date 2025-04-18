/////////////////////////////////////////
// GUARD TO CHECK IF TEST IS COMPLETED //
/////////////////////////////////////////

// imports

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// declare guard class as injectable
// implement canactivate interface which allow class
// to decide if route is activated or cancelled
// it is activated if returns true

@Injectable({
  providedIn: 'root',
})
export class FormAccessGuard implements CanActivate {
  constructor(private router: Router) {}

  // function decides if route is activated
  // it is if user completed whole test
  // if not then navigate to the main page

  canActivate(): boolean {
    const testCompleted = localStorage.getItem('testCompleted') === 'true';

    if (!testCompleted) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}