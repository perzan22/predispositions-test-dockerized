//////////////////////////
// MAIN PANEL COMPONENT //
//////////////////////////

// imports

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

// component declaration

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.sass'
})
export class MainPanelComponent {


  constructor(private authService: AuthService) {}

  // on logout method

  onLogout() {
    this.authService.logout()
  }

}
