import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAfiliationsService {

  private baseUrl: string

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getAfiliations(employeeId:number): Promise<any> {
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/employee/afiliations/all/${employeeId}`));
  }

  create( employeeId:number, formData: any): Promise<any> {
    console.log('Sending create request with employeeId:', employeeId);  // Log para depuración
    console.log('FormData:', formData);  // Log para depuración
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/employee/afiliations/create/${employeeId}`, formData));
  }

  update(id: number, formData: any): Promise<any> {
    return firstValueFrom(this.httpClient.put<any>(`${this.baseUrl}/employee/afiliations/update/${id}`, formData));
  }

  delete(id: number): Promise<any> {
    return firstValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/employee/afiliations/delete/${id}`));
  }
}
