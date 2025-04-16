import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './admin/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {
  title = 'Test predyspozycji';

  constructor(private router: Router, private authService: AuthService) {}


  ngOnInit(): void {

    this.authService.autoAuth()
    
  }

  isAdminPage(): boolean {
    return this.router.url.includes('/admin')
  }

  getLayoutClass(): string {
    return this.router.url.includes('/admin') ? 'admin-layout' : 'main-layout'
  }
}
