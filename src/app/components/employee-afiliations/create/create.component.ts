import { Component, inject } from '@angular/core'
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialog } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
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
    MatNativeDateModule
  ],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateEmployeeAfiliationsComponent {
  employeeId = 0
  afiliationForm: FormGroup
  afiliationService = inject(EmployeeAfiliationsService)
  instanceEmployeed: any

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
			this.employeeId = params['id']
		  })
    console.log(this.employeeId)
    this.afiliationForm = new FormGroup({
      entityName: new FormControl(),
      dateAfiliation: new FormControl(),
    })
    this.instanceEmployeed = {}
  }

  async create() {
    try {
      const data = this.afiliationForm.value
      const afiliation = this.save(data)
      const response: any = await this.afiliationService.create(this.employeeId, afiliation)
      console.log(response)
      this.router.navigate(['/employee/afiliation/consult'], { queryParams: { id: this.employeeId } })
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


  save(data: any) {
    this.instanceEmployeed.employeeId = this.employeeId
    this.instanceEmployeed.entityName = data.entityName
    this.instanceEmployeed.dateAfiliation = data.dateAfiliation
    this.instanceEmployeed.status = true
    return this.instanceEmployeed
  }

  goToConsult() {
    this.router.navigate(['/employee/afiliation/consult'], { queryParams: { id: this.employeeId } })
  }
}