// Import potrzebnych bibliotek
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Dekorator pozwala wstrzykiwać serwis w całej aplikacji
@Injectable({
  providedIn: 'root'
})
// Klasa serwisu
export class MailService {

  // Konstruktor zawiera obsługę żądań HTTP
  constructor(private http: HttpClient) { }

  // Funkcja wystyłająca żądanie POST do serwera w celu wysłania maila do kandydata
  sendMail(imie: string, nazwisko: string, kierunek: string, email: string) {
    return this.http.post<{ message: string, url: string }>('http://localhost:3000/api/mail/', { imie, nazwisko, kierunek, email });
  }

}
