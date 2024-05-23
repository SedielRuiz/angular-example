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
  id = 0
  afiliationForm: FormGroup
  afiliationService = inject(EmployeeAfiliationsService)
  data: any
  instanceEmployeed: any

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
			this.id = params['id']
		  })
    this.data = this.router.getCurrentNavigation()?.extras.state
    console.log(this.data)
    this.afiliationForm = new FormGroup({

      entityName: new FormControl(),
      dateAfiliation: new FormControl(),
      status: new FormControl()
    })
    this.instanceEmployeed = {}
  }

  async create() {
    try {
      const data = this.afiliationForm.value
      console.log(data)
      const afiliation = this.save(data)
      console.log(afiliation)
      console.log(this.id)
      const response: any = await this.afiliationService.create(this.id, afiliation)
      console.log(response)
      this.router.navigate(['/employee/afiliation/consult'], { state: this.data, queryParams: { id: this.id } })
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
    this.instanceEmployeed.employeeId = this.id
    this.instanceEmployeed.entityName = data.entityName
    this.instanceEmployeed.dateAfiliation = data.dateAfiliation
    this.instanceEmployeed.status = data.status
    return this.instanceEmployeed
  }
}