import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../candidates/candidate.model';
import { CandidatesService } from '../../../candidates/candidates.service';
import { Subscription } from 'rxjs';

import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver-es'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrl: './candidates-list.component.sass'
})
export class CandidatesListComponent implements OnInit {

  candidates: Candidate[] = []
  private candidatesSubs!: Subscription
  displayedColumns: string[] = ['imie', 'nazwisko', 'email', 'miasto', 'data', 'nazwa', 'usun']

  constructor(private candidatesService: CandidatesService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.candidatesService.getCandidates();
    this.candidatesSubs = this.candidatesService.getCandidatesUpdateListener().subscribe({
      next: candidatesData => {
        this.candidates = candidatesData.candidates
      },
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
      }
    })
  }

  onDelete(id_kandydata: number) {
    this.candidatesService.deleteCandidate(id_kandydata).subscribe({
      next: deletedCandidate => {
        this.candidates = this.candidates.filter(candidate => candidate.id_kandydata !== id_kandydata);
        this.snackBar.open(deletedCandidate.message, 'OK', { duration: 3000 })
      },
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
      }
    })
  }

  // Funkcja eksportująca dane kandydatów
  exportDataToExcel() {
    // Konwersja danych do arkusza excel
    const worksheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(this.candidates);

    // Tworzenie skoroszytu excel o nazwie Dane kandydatów
    const workbook: xlsx.WorkBook = {
      Sheets: { 'Dane kandydatów': worksheet },
      SheetNames: ['Dane kandydatów']
    };

    // Zapisanie danych do skoroszytu Dane kandydatów
    const excelBuffer: any = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    })

    // Tworzenie pliku i jego pobranie
    const fileName = 'kandydaci-na-studia.xlsx';
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);

    // Powiadomienie użytkownika o pobraniu pliku
    this.snackBar.open('Pobrano plik .xlsx', 'OK', { duration: 3000 })
  }

}
