////////////////////////////////////
// FIELDS OF STUDY LIST COMPONENT //
////////////////////////////////////

// imports

import { Component } from '@angular/core';
import { StudyField } from '../../../study-fields/study-field.model';
import { filter, Subscription } from 'rxjs';
import { StudyFieldsService } from '../../../study-fields/study-fields.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// component declaration

@Component({
  selector: 'app-study-fields-select',
  templateUrl: './study-fields-select.component.html',
  styleUrl: './study-fields-select.component.sass'
})
export class StudyFieldsSelectComponent {

  studyFields: StudyField[] = []
  private studyFieldsSubs!: Subscription

  constructor(private studyFieldsService: StudyFieldsService, private snackBar: MatSnackBar) {}

  // get fields of study on component initialization

  ngOnInit(): void {
    this.studyFieldsService.getStudyFields();
    this.studyFieldsSubs = this.studyFieldsService.getStudyFieldsUpdateListener().subscribe({
      next: studyFieldsData => {
        this.studyFields = studyFieldsData.studyFields
      },
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
      }
    })
  }

  // on delete button send study field data to service
  // and remove it from the list
  // so html file doesnt show it
  
  deleteStudyField(studyFieldID: number) {
    this.studyFieldsService.deleteStudyField(studyFieldID).subscribe({
      next: deletedStudyField => {
        this.studyFields = this.studyFields.filter(field => field.id_kierunku !== studyFieldID)
        this.snackBar.open(deletedStudyField.message, 'OK', { duration: 3000 })
      },
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
      }
    })
  }

}
