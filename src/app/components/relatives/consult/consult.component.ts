import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RelativesService } from '../../../services/relatives.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RelativeIdService } from '../../../services/relative-id.service';

@Component({
  selector: 'app-consult',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.css',
})
export class ConsultRelativesComponent implements AfterViewInit {
  id: number = 0;
  constructor(private idService: RelativeIdService,private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }

  relativesService = inject(RelativesService);
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'employeeId',
    'name',
    'lastname',
    'document',
    'email',
    'phone',
    'address',
    'status',
    'department',
    'birthDate',
    'relationship',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  async ngAfterViewInit() {
    this.idService.changeId(this.id);
    await this.getRelative();
    this.dataSource.paginator = this.paginator;
  }

  async getRelative() {
    const response: any = await this.relativesService.getRelatives(this.id); 
    console.log(response);
    this.dataSource = new MatTableDataSource<Relative>(response.data);
  }

  async delete(id: number) {
    await this.relativesService.delete(id);
    window.location.reload();
  }

  update(id: number, data: any) {
    this.router.navigate(['/employee/relatives/update', id], { state: data });
  }
}

export interface Relative {
  id: number;
  employeeId: number;
  name: string;
  lastname: string;
  document: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  department: string;
  birthDate: string;
  relationship: string;
}
