import { Component, inject } from '@angular/core'
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialog } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatNativeDateModule } from '@angular/material/core'
import { RouterModule, Router, ActivatedRoute } from '@angular/router'
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component'
import { EmployeeAfiliationsService } from '../../../services/employee-afiliations.service'

@Component({
  selector: 'app-create',
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
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateEmployeeAfiliationsComponent {
  employeeId = 0
  afiliationForm: FormGroup
  afiliationService = inject(EmployeeAfiliationsService)
  navigationData: any
  employeeInstance: any

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      this.employeeId = params['id']
    })
    this.navigationData = this.router.getCurrentNavigation()?.extras.state
    console.log(this.navigationData)
    this.afiliationForm = new FormGroup({
      entityName: new FormControl(),
      dateafiliation: new FormControl(),
      status: new FormControl()
    })
    this.employeeInstance = {}
  }

  async create() {
    try {
      const formData = this.afiliationForm.value
      console.log(formData)
      const afiliationData = this.prepareafiliationData(formData)
      console.log(afiliationData)
      console.log(this.employeeId)
      const response: any = await this.afiliationService.create(this.employeeId, afiliationData)
      console.log(response)
      this.router.navigate(['/employee/afiliation/consult'], { state: this.navigationData, queryParams: { id: this.employeeId } })
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

  prepareafiliationData(formData: any) {
    this.employeeInstance.employeeId = this.employeeId
    this.employeeInstance.entityName = formData.entityName
    this.employeeInstance.dateafiliation = formData.dateafiliation
    this.employeeInstance.status = formData.status
    return this.employeeInstance
  }
}