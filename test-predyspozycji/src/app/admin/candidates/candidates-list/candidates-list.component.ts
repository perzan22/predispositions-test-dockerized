///////////////////////////////
// CANDIDATES LIST COMPONENT //
///////////////////////////////

// imports

import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../candidates/candidate.model';
import { CandidatesService } from '../../../candidates/candidates.service';
import { Subscription } from 'rxjs';

// imports for xlsx file exporting

import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver-es'
import { MatSnackBar } from '@angular/material/snack-bar';

// component declaration

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

  // get candidates data on component initialization

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

  // on delete button send candidate data to service

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

  // function export table data to excel file

  exportDataToExcel() {

    // conversion json data to sheet data

    const worksheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(this.candidates);

    // create excel sheet

    const workbook: xlsx.WorkBook = {
      Sheets: { 'Dane kandydatów': worksheet },
      SheetNames: ['Dane kandydatów']
    };

    // save candidate data to excel sheet

    const excelBuffer: any = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    })

    // create and download candidate xlsx file

    const fileName = 'kandydaci-na-studia.xlsx';
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
    
    this.snackBar.open('Pobrano plik .xlsx', 'OK', { duration: 3000 })
  }

}
