///////////////////////
// CANDIDATE SERVICE //
///////////////////////

// imports

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidate } from './candidate.model';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

// set service as injectable to inject class to app components

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  private apiURL = 'http://localhost:3000/api/candidates'
  private candidates: Candidate[] = []
  private candidatesSubs = new Subject<{ candidates: Candidate[] }>

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  // method sends POST request to create new candidate

  createCandidate(imie: string, nazwisko: string, email: string, miasto: string) {

    const candidateData = {
      imie: imie,
      nazwisko: nazwisko,
      email: email,
      miasto: miasto
    }

    return this.http.post<{ message: string, id_kandydata: number }>(`${this.apiURL}`, candidateData);

  }

  // method sends GET request to fetch candidates from database

  getCandidates() {
    this.http.get<{ candidates: any, message: string }>(`http://localhost:3000/api/candidates/`).subscribe({
      next: fetchedCandidates => {
        this.candidates = fetchedCandidates.candidates;
        this.candidatesSubs.next({ candidates: [...this.candidates] })
      },
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
      }
    })
  }

  // method sends DELETE request to remove candidate

  deleteCandidate(id_kandydata: number) {
    return this.http.delete<{ message: string }>(`http://localhost:3000/api/candidates/?id_kandydata=${id_kandydata}`);
  }

  // method returns candidatesSubs as observable

  getCandidatesUpdateListener() {
    return this.candidatesSubs.asObservable();
  }

}
