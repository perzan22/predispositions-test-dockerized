//////////////////////////
// STUDY FIELDS SERVICE //
//////////////////////////

// imports

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudyField } from './study-field.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// set service as injectable to inject class to app components

@Injectable({
  providedIn: 'root'
})
export class StudyFieldsService {

  studyFields: StudyField[] = []
  studyFieldsSubs = new Subject<{ studyFields: StudyField[] }>

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  // method sends GET request to fetch fields of study

  getStudyFields() {
    this.http.get<{ studyFields: any, message: string }>(`http://localhost:3000/api/study-fields/`).subscribe({
      next: fetchedStudyFields => {
        this.studyFields = fetchedStudyFields.studyFields;
        this.studyFieldsSubs.next({ studyFields: [...this.studyFields] })
      },
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
      }
    })
  }

  // method sends GET request to fetch specific field of study

  getStudyField(id_kierunku: number) {
    return this.http.get<{ id_kierunku: number, nazwa: string, wydzial: string, x: number, y: number }>(`http://localhost:3000/api/study-fields/edit?id_kierunku=${id_kierunku}`)
  }

  // method sends POST request to add new field of study

  addStudyField(nazwa: string, wydzial: string, x: number, y: number) {
    const studyFieldData = {
      nazwa: nazwa,
      wydzial: wydzial,
      x: x,
      y: y
    }
    

    this.http.post<{ studyField: StudyField, message: string }>(`http://localhost:3000/api/study-fields/`, studyFieldData).subscribe({
      next: createddStudyField => {
        this.snackBar.open(createddStudyField.message, 'OK', { duration: 3000 })
        this.router.navigate(['/admin/kierunki'])
      },
      error: error => {
        console.log(error.message)
      }
    })
  }

  // method sends PATCH request to edit existing field of study

  editStudyField(nazwa: string, wydzial: string, x: number, y: number, studyFieldID: number) {
    const studyFieldData = {
      nazwa: nazwa,
      wydzial: wydzial,
      x: x,
      y: y
    }
    

    this.http.patch<{ studyField: StudyField, message: string }>(`http://localhost:3000/api/study-fields?id_kierunku=${studyFieldID}`, studyFieldData).subscribe({
      next: editedStudyField => {
        this.snackBar.open(editedStudyField.message, 'OK', { duration: 3000 })
        this.router.navigate(['/admin/kierunki'])
      },
      error: error => {
        console.log(error.message)
      }
    })
  }

  // method returns Subject variable as Observable

  getStudyFieldsUpdateListener() {
    return this.studyFieldsSubs.asObservable()
  }

  // method sends DELETE request to delete specific field of study

  deleteStudyField(studyFieldID: number): Observable<any> {
    return this.http.delete<{ studyField: StudyField, message: string }>(`http://localhost:3000/api/study-fields?id_kierunku=${studyFieldID}`)
  }
}
