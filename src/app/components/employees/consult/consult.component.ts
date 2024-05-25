import { AfterViewInit, Component, ViewChild, inject } from '@angular/core'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { EmployeeService } from '../../../services/employee.service'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatButtonModule } from '@angular/material/button'
import { Router, RouterModule } from '@angular/router'

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
export class ConsultEmployeeComponent implements AfterViewInit{
	constructor(
        private router: Router
    ) {
    }

	employeeService = inject(EmployeeService)
		dataSource: any
		displayedColumns: string[] = ['id', 'name', 'lastname', 'email', 'actions']

		@ViewChild(MatPaginator) paginator!: MatPaginator

		async ngAfterViewInit() {
	        await this.getEmployee()
			this.dataSource.paginator = this.paginator
	    }

    async getEmployee(){
        const response: any = await this.employeeService.getEmployees()
		console.log(response.data)
		this.dataSource = new MatTableDataSource<Employee>(response.data)
    }

	async delete(id: number) {
		await this.employeeService.delete(id)
		window.location.reload()
	}

	update(id: number, data: any) {
		this.router.navigate(['/employee/update', id], { state: data })
	}

	goToCreateAfiliation(id: number, data: any) {
		this.router.navigate(['/employee/afiliation/consult'], { queryParams: { id: id } });
	}
}

export interface Employee {
	id: number
	name: string
	lastname: string
	email: string
}
