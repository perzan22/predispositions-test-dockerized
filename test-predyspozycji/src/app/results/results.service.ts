////////////////////
// RESULT SERVICE //
////////////////////

// imports

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../questions/answer.model';

// set service as injectable to inject class to app components

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http: HttpClient) { }

  // method sends POST request to calculate result
  // based on candidate answers

  getResults(candidateAnswers: Answer[]): Observable<any> {

    return this.http.post<{ kierunek: number, wynik: number }>(`http://localhost:3000/api/results/getResult/`, { candidateAnswers })
  }

  // method sends POST request to add new result

  addResult(id_kandydata: number, id_kierunku: number, wynik: number) {

    const resultData = {
      id_kandydata: id_kandydata,
      id_kierunku: id_kierunku,
      wynik: wynik
    }

    return this.http.post<{ message: string, wynik_testu: number }>(`http://localhost:3000/api/results/`, resultData)

  }
}


