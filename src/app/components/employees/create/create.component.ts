import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDividerModule } from '@angular/material/divider'
import { EmployeeService } from '../../../services/employee.service'

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
        MatDividerModule
    ],
    templateUrl: './create.component.html',
    styleUrl: './create.component.css'
})
export class CreateEmployeeComponent {
    employeeForm : FormGroup
    employeeService = inject(EmployeeService)

    constructor(
        private router: Router,
        private dialog: MatDialog
    ) {
        this.employeeForm = new FormGroup({
            name: new FormControl(),
            lastname: new FormControl(),
            document: new FormControl(),
            email: new FormControl(),
            phone: new FormControl(),
            address: new FormControl()
        })
    }

    async create() {
        try {
            const data = {...this.employeeForm.value, status: 1}
            const response: any = await this.employeeService.create(data)
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
