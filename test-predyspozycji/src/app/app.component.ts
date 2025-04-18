///////////////////
// APP COMPONENT //
///////////////////

// imports

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './admin/auth/auth.service';

// component declaration

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {
  title = 'Test predyspozycji';

  constructor(private router: Router, private authService: AuthService) {}

  // auto authorization based on cookies on component initialization

  ngOnInit(): void {

    this.authService.autoAuth()
    
  }

  // check if this is admin page

  isAdminPage(): boolean {
    return this.router.url.includes('/admin')
  }

  // get css style based on url

  getLayoutClass(): string {
    return this.router.url.includes('/admin') ? 'admin-layout' : 'main-layout'
  }
}
