import { Component, inject } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { UsersService } from '../../../services/users.service'
import { MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDividerModule } from '@angular/material/divider'

@Component({
    selector: 'login-component',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatCardModule, 
        MatButtonModule,
        FormsModule, 
        MatFormFieldModule, 
        MatInputModule,
        MatDividerModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
  	loginForm : FormGroup
    userService = inject(UsersService)

    constructor(
        private router: Router,
        private dialog: MatDialog
    ) {
        this.loginForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl()
        })
    }

    async singIn() {
        try {
            const response: any = await this.userService.singIn(this.loginForm.value)
            console.log(response)
            localStorage.setItem('token', response.data)
            localStorage.setItem('singIn', "1")
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
