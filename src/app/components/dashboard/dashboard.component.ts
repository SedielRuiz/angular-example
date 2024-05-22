import { Component, inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard';
import { Router } from '@angular/router';

@Component({
	selector: 'dashboard-component',
	standalone: true,
	imports: [],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    dashboardService = inject(DashboardService)

    constructor(
        private router: Router
    ) {
    }

    ngOnInit() {
        this.getUsers()
        this.getAfiliations()
    }

    async getUsers(){
        const response: any = await this.dashboardService.getUsers()
    }

    async getAfiliations(){
        const response: any = await this.dashboardService.getAfiliation()
    }
}
