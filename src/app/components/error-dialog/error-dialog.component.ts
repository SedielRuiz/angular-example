import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA,
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent
} from '@angular/material/dialog'

@Component({
    selector: 'app-error-dialog',
    standalone: true,
    imports: [
        MatButtonModule,
        MatButtonModule, 
        MatDialogActions, 
        MatDialogClose, 
        MatDialogTitle, 
        MatDialogContent
    ],
    templateUrl: './error-dialog.component.html',
    styleUrl: './error-dialog.component.css'
})
export class ErrorDialogComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        console.log(this.data.message)
    }
}
