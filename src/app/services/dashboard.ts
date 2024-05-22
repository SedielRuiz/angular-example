import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  	providedIn: 'root'
})
export class DashboardService {

    private baseUrl: string

  	constructor(private httpClient: HttpClient) {
        this.baseUrl = 'http://localhost:3015/v1'
    }

    getUsers() {
        return firstValueFrom(
            this.httpClient.get(`${this.baseUrl}/employee/all`)
        )
    }
    getAfiliation() {
        return firstValueFrom(
            this.httpClient.get(`${this.baseUrl}/afiliations/all`)
        )
    }
}
