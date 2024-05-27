import { AfterViewInit, Component, inject, NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDividerModule } from '@angular/material/divider'
import { DocumentsService } from '../../../services/documents.service'
import { RelativeIdService } from '../../../services/relative-id.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'app-create',
    standalone: true,
    imports: [
        MatNativeDateModule,
        MatDatepickerModule,
        RouterModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule
    ],
    templateUrl: './create.component.html',
    styleUrl: './create.component.css'
})
export class CreateDocumentComponent implements AfterViewInit {
    userId!: number;
    documentForm : FormGroup
    documentService = inject(DocumentsService)

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private idService: RelativeIdService
    ) {
      
        this.documentForm = new FormGroup({
            name: new FormControl(),
            extension: new FormControl(),
            version: new FormControl(),
            url: new FormControl(),
            status: new FormControl(),
        })
    }
    async ngAfterViewInit() {
        this.idService.currentId.subscribe(id => {
            if (id !== null) {
                this.userId = id;
            }
        });
        console.log(this.userId);
    }

    async create() {
        try {
            const data = {...this.documentForm.value, status: true, employeeId: this.userId}
            const response: any = await this.documentService.create(data)
            console.log(response)
            this.router.navigate(['/employee/documents/consult',this.userId])

        } catch (response: any) {
            console.log(response.error.message)
            this.dialog.open(ErrorDialogComponent, {
                data: {
                    message: response.error.message,
                    statusCode: response.error.statusCode
                }
            })
        }

    }
}
