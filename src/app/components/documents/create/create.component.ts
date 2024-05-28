import { AfterViewInit, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { DocumentsService } from '../../../services/documents.service';
import { RelativeIdService } from '../../../services/relative-id.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-create',
    standalone: true,
    imports: [
        MatNativeDateModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatSlideToggleModule,
    ],
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateDocumentComponent implements AfterViewInit {
    userId!: number;
    documentForm: FormGroup;
    documentService = inject(DocumentsService);
    file: File | null = null;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private idService: RelativeIdService
    ) {
        this.documentForm = new FormGroup({
            name: new FormControl('', { nonNullable: true }),
        });
    }

    async ngAfterViewInit() {
        this.idService.currentId.subscribe(id => {
            if (id !== null) {
                this.userId = id;
            }
        });
        console.log(this.userId);
    }

    onFileChange(event: any) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
        }
    }

    async create() {
        try {
            if (!this.file) {
                throw new Error('No file selected');
            }

            const extension = this.file.name.split('.').pop();
            if (!extension) {
                throw new Error('File does not have an extension');
            }

            const version = 1;
            const url = `http://example.com/${this.file.name}`;
            const data = {
                name: this.documentForm.get('name')?.value,
                extension,
                version,
                url,
                status: true,
                employeeId: this.userId
            };

            console.log(data);


            const response: any = await this.documentService.create(data);
            console.log(response);
            this.router.navigate(['/employee/documents/consult', this.userId]);
        } catch (error: any) {
            console.error(error);
            const message = error?.response?.error?.message || 'An unexpected error occurred';
            const statusCode = error?.response?.error?.statusCode || 'Unknown';
            this.dialog.open(ErrorDialogComponent, {
                data: {
                    message,
                    statusCode
                }
            });
        }
    }
}
