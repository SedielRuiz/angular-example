import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DocumentsService } from '../../../services/documents.service';
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
export class ConsultDocumentsComponent implements AfterViewInit {
  id: number = 0;
  constructor(private idService: RelativeIdService,private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }

  documentsService = inject(DocumentsService);
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'employeeId',
    'name',
    'extension',
    'version',
    'url',
    'status',
    'createdAt',
    'updatedAt',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  async ngAfterViewInit() {
    this.idService.changeId(this.id);
    await this.getDocuments();
    this.dataSource.paginator = this.paginator;
  }

  async getDocuments() {
    const response: any = await this.documentsService.getDocuments(this.id); 
    console.log(response);
    this.dataSource = new MatTableDataSource<Relative>(response.data);
  }

  async deleteDocument(id: number) {
    await this.documentsService.delete(id);
    window.location.reload();
  }

  updateDocument(id: number, data: any) {
    this.router.navigate(['/employee/documents/update', id], { state: data });
  }
}

export interface Relative {
  employeeId:number;
  name:string;
  extension:string;
  version:number;
  url:string;
  status:boolean;
  createdAt:Date;
  updatedAt:Date;
}
