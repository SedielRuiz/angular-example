import { AfterViewInit, Component, inject, NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDividerModule } from '@angular/material/divider'
import { RelativesService } from '../../../services/relatives.service'
import { RelativeIdService } from '../../../services/relative-id.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'app-create',
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
    templateUrl: './create.component.html',
    styleUrl: './create.component.css'
})
export class CreateRelativesComponent implements AfterViewInit {
    userId!: number;
    relativeForm : FormGroup
    relativeService = inject(RelativesService)

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private idService: RelativeIdService
    ) {
        this.relativeForm = new FormGroup({
            name: new FormControl(),
            lastname: new FormControl(),
            document: new FormControl(),
            email: new FormControl(),
            phone: new FormControl(),
            address: new FormControl(),
            department: new FormControl(),
            birthDate: new FormControl(),
            relationship: new FormControl(),
        })
    }
    async ngAfterViewInit() {
        this.idService.currentId.subscribe(id => {
            if (id !== null) {
                this.userId = id;
            }
        });
    }

    async create() {
        try {
            const data = {...this.relativeForm.value, status: true, employeeId: this.userId}
            const response: any = await this.relativeService.create(data)
            console.log(response)
            this.router.navigate(['/employee/relatives/consult',this.userId])

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
