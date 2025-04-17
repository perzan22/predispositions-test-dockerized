import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.sass'
})
export class DialogComponent {

  message: string = '';
  // link do testowego maila
  url: string = '';

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
  }
  
  onCloseClick() {
    this.dialogRef.close()
  }



}
