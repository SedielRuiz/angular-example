import { AfterViewInit, Component, inject } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDividerModule } from '@angular/material/divider'
import { DocumentsService } from '../../../services/documents.service'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RelativeIdService } from '../../../services/relative-id.service';

@Component({
	selector: 'app-update',
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
	templateUrl: './update.component.html',
	styleUrl: './update.component.css'
})
export class UpdateDocumentComponent implements AfterViewInit {
  userId!: number;
	id: number = 0
	data: any
	documentForm : FormGroup
    documentService = inject(DocumentsService)

    constructor(
        private router: Router,
		    private route: ActivatedRoute,
        private dialog: MatDialog,
        private idService: RelativeIdService
    ) {
		this.id = this.route.snapshot.params['id']
		this.data = this.router.getCurrentNavigation()?.extras.state

      this.documentForm = new FormGroup({
        name: new FormControl(this.data.name),
        extension: new FormControl(this.data.extension),
        version: new FormControl(this.data.version),
        url: new FormControl(this.data.url),
        status: new FormControl(this.data.status),
    })

    }

    async ngAfterViewInit() {
        this.idService.currentId.subscribe(id => {
            if (id !== null) {
                this.userId = id;
            }
        });
    }

    async update() {
        try {
            const dataUpdate = this.documentForm.value;

            const response: any = await this.documentService.update(this.id, {...dataUpdate, status:true})
            console.log(response)
            this.router.navigate(['/employee/documents/consult', this.userId])

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

    cancelUpdateDocument() {
        this.router.navigate(['/employee/documents/consult', this.userId]);
    }
}
