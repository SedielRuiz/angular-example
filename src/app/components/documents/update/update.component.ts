import { AfterViewInit, Component, inject } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDividerModule } from '@angular/material/divider'
import { DocumentsService } from '../../../services/documents.service'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { RelativeIdService } from '../../../services/relative-id.service'

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
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSlideToggleModule,
  ],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateDocumentComponent implements AfterViewInit {
  userId!: number
  id: number = 0
  data: any
  documentForm: FormGroup
  documentService = inject(DocumentsService)
  file: File | null = null

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private idService: RelativeIdService
  ) {
    this.id = this.route.snapshot.params['id']
    this.data = this.router.getCurrentNavigation()?.extras.state

    this.documentForm = new FormGroup({
      name: new FormControl(this.data.name, { nonNullable: true }),
      status: new FormControl(this.data.status, { nonNullable: true }),
    })
  }

  async ngAfterViewInit() {
    this.idService.currentId.subscribe(id => {
      if (id !== null) {
        this.userId = id
      }
    })
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0]
    }
  }

  async update() {
    try {
      const name = this.documentForm.get('name')?.value || ''
      const status = this.documentForm.get('status')?.value ?? true
      let dataToUpdate: any = { name, status }

      if (this.file) {
        const extension = this.file.name.split('.').pop()
        if (!extension) {
          throw new Error('File does not have an extension')
        }

        const version = this.data.version + 1
        const url = `http://example.com/${this.file.name}`

        dataToUpdate = {
          ...dataToUpdate,
          extension,
          version,
          url,
          employeeId: this.userId
        }
      }

      console.log(dataToUpdate)

      const response: any = await this.documentService.update(this.id, dataToUpdate)
      console.log(response)
      this.router.navigate(['/employee/documents/consult', this.userId])
    } catch (error: any) {
      console.error(error)
      const message = error?.message || 'An unexpected error occurred'
      const statusCode = error?.statusCode || 'Unknown'
      this.dialog.open(ErrorDialogComponent, {
        data: {
          message,
          statusCode
        }
      })
    }
  }


  cancelUpdateDocument() {
    this.router.navigate(['/employee/documents/consult', this.userId])
  }
}
