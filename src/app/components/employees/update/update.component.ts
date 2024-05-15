import { Component, inject } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDividerModule } from '@angular/material/divider'
import { EmployeeService } from '../../../services/employee.service'

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
		MatDividerModule
	],
	templateUrl: './update.component.html',
	styleUrl: './update.component.css'
})
export class UpdateEmployeeComponent {
	id: number = 0
	data: any
	employeeForm : FormGroup
    employeeService = inject(EmployeeService)

    constructor(
        private router: Router,
		private route: ActivatedRoute,
        private dialog: MatDialog
    ) {
		this.id = this.route.snapshot.params['id']
		this.data = this.router.getCurrentNavigation()?.extras.state

        this.employeeForm = new FormGroup({
            name: new FormControl(this.data.name),
            lastname: new FormControl(this.data.lastname),
            document: new FormControl(this.data.document),
            email: new FormControl(this.data.email),
            phone: new FormControl(this.data.phone),
            address: new FormControl(this.data.address)
        })
    }

    async update() {
        try {
            const response: any = await this.employeeService.update(this.id, this.employeeForm.value)
            console.log(response)
            this.router.navigate(['/employee/consult'])

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
