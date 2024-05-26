import { AfterViewInit, Component, ViewChild, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { EmployeeAfiliationsService } from '../../../services/employee-afiliations.service'

@Component({
  selector: 'app-consult',
  standalone: true,
  imports: [
		RouterModule,
		MatTableModule,
		MatPaginatorModule,
		MatButtonModule
	],
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.css'
})
export class ConsultEmployeeAfiliationsComponent implements AfterViewInit{
	id: number = 0
	data: any
	constructor(
        private router: Router,
		private route: ActivatedRoute,
    ) {
		this.route.queryParams.subscribe(params => {
			this.id = params['id']
		  })
		console.log(this.id)
		this.data = this.router.getCurrentNavigation()?.extras.state
		console.log(this.data)
    }

	employeeAfiliationsService = inject(EmployeeAfiliationsService)
		dataSource: any
		displayedColumns: string[] = ['id', 'entityName', 'dateAfiliation', 'status', 'actions']

		@ViewChild(MatPaginator) paginator!: MatPaginator

		async ngAfterViewInit() {
	        await this.getAfiliation()
			this.dataSource.paginator = this.paginator
	    }

    async getAfiliation(){
        const response: any = await this.employeeAfiliationsService.getAfiliations(this.id)
		console.log(response.data)
		this.dataSource = new MatTableDataSource<Afiliation>(response.data)
    }

	async delete(id: number) {
		await this.employeeAfiliationsService.delete(id)
		window.location.reload()
	}

	update(id: number, data: any) {
		this.router.navigate(['/employee/afiliation/update', id], { state: data })
	}
	goToCreate() {
		this.router.navigate(['employee/afiliation/create'], { state: this.data, queryParams: { id: this.id } })
	}
}

export interface Afiliation {
	id: number
	entityName: string
	dateAfiliation: Date
	status: boolean
}
