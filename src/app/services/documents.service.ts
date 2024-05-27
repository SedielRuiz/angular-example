import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { environment } from '../../environment'

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private baseUrl: string

  constructor(private httpClient: HttpClient) {
      this.baseUrl = environment.baseUrl
  }

  getDocuments(employeeId: number): Promise<any> {
      return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/employee/documents/all?employeeId=${employeeId}`))
  }

  create(formData: any): Promise<any> {
      return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/employee/documents/create`, formData));
  }

  update(id: number, formData: any): Promise<any> { 
      return firstValueFrom(this.httpClient.put<any>(`${this.baseUrl}/employee/documents/update/${id}`, formData));
  }

  delete(id: number): Promise<any> {
      return firstValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/employee/documents/delete/${id}`));
  }
}
