import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { firstValueFrom } from 'rxjs'
import { environment } from '../../environment'

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.baseUrl
    }

    getEmployees(): Promise<any> {
        return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/employee/all`))
    }

    create(formData: any): Promise<any> {
        return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/employee/create`, formData));
    }

    update(id: number, formData: any): Promise<any> { 
        return firstValueFrom(this.httpClient.put<any>(`${this.baseUrl}/employee/update/${id}`, formData));
    }

    delete(id: number): Promise<any> {
        return firstValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/employee/delete/${id}`));
    }
}
