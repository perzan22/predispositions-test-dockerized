import { NgModule } from "@angular/core";

import { MatButtonModule } from "@angular/material/button"
import { MatInputModule } from "@angular/material/input"
import { MatCardModule } from "@angular/material/card"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatDividerModule } from "@angular/material/divider"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from "@angular/material/select"
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatTableModule } from '@angular/material/table'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'


@NgModule({
    exports: [
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatToolbarModule,
        MatDividerModule,
        MatProgressBarModule,
        MatCheckboxModule,
        MatIconModule,
        MatSelectModule,
        MatTooltipModule,
        MatTableModule,
        MatDialogModule,
        MatSnackBarModule
    ],

    providers: [

    ]
})

export class AngularMaterialModule {}