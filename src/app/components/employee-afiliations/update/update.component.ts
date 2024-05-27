import { Component, inject } from '@angular/core'
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { EmployeeAfiliationsService } from '../../../services/employee-afiliations.service'
import { MatDialog } from '@angular/material/dialog'
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component'

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatNativeDateModule
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateEmployeeAfiliationsComponent {
  id: number = 0
  data: any
  updateAfiliationForm: FormGroup
  afiliationService = inject(EmployeeAfiliationsService)
  employeeForm: any
  employeeInstance: any = {
    employeeId: null,
    entityName: '',
    dateAfiliation: '',
    status: ''
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.id = this.route.snapshot.params['id']
    this.data = this.router.getCurrentNavigation()?.extras.state || {}
    this.updateAfiliationForm = new FormGroup({
      entityName: new FormControl(this.data.entityName || ''),
      dateAfiliation: new FormControl(this.data.dateAfiliation || ''),
      status: new FormControl(this.data.status || '')
    })
  }

  async updateEmployeeAfiliation() {
    try {
      const formData = this.updateAfiliationForm.value
      const afiliationData = this.prepareAfiliationData(formData)
      const response: any = await this.afiliationService.update(this.id, afiliationData)
      this.router.navigate(['/employee/afiliation/consult'], { queryParams: { id: this.data.employeeId } })
    } catch (error: any) {
      console.log(error.error.message)
      this.dialog.open(ErrorDialogComponent, {
          data: {
              message: error.error.message,
              statusCode: error.error.statusCode
          }
      })
    }
  }

  goToConsult() {
    this.router.navigate(['/employee/afiliation/consult'], { queryParams: { id: this.data.employeeId } })
  }

  prepareAfiliationData(formData: any) {
    console.log(formData)
    this.employeeInstance.employeeId = this.data.employeeId
    this.employeeInstance.entityName = formData.entityName
    this.employeeInstance.dateAfiliation = formData.dateAfiliation
    this.employeeInstance.status = formData.status
    return this.employeeInstance
  }
}

