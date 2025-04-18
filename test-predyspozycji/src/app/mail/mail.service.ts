//////////////////
// MAIL SERVICE //
//////////////////

// imports

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// set service as injectable to inject class to app components

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  // method sends POST request to send email informations

  sendMail(imie: string, nazwisko: string, kierunek: string, email: string) {
    return this.http.post<{ message: string, url: string }>('http://localhost:3000/api/mail/', { imie, nazwisko, kierunek, email });
  }

}
