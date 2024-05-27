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
import { RelativesService } from '../../../services/relatives.service'
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
export class UpdateRelativeComponent implements AfterViewInit {
  userId!: number;
	id: number = 0
	data: any
	relativeForm : FormGroup
    relativeService = inject(RelativesService)

    constructor(
        private router: Router,
		    private route: ActivatedRoute,
        private dialog: MatDialog,
        private idService: RelativeIdService
    ) {
		this.id = this.route.snapshot.params['id']
		this.data = this.router.getCurrentNavigation()?.extras.state

        this.relativeForm = new FormGroup({
          name: new FormControl(this.data.name),
          lastname: new FormControl(this.data.lastname),
          document: new FormControl(this.data.document),
          email: new FormControl(this.data.email),
          phone: new FormControl(this.data.phone),
          address: new FormControl(this.data.address),
          department: new FormControl(this.data.department),
          birthDate: new FormControl(this.data.birthDate),
          relationship: new FormControl(this.data.relationship),
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
            const dataUpdate = this.relativeForm.value;

            const response: any = await this.relativeService.update(this.id, {...dataUpdate, status:true})
            console.log(response)
            this.router.navigate(['/employee/relatives/consult', this.userId])

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

    cancelUpdateRelative() {
        this.router.navigate(['/employee/relatives/consult', this.userId]);
    }
}
