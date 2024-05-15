import { Routes } from '@angular/router'
import { LoginComponent } from './components/users/login/login.component'
import { RegisterComponent } from './components/users/register/register.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { authGuard } from './guards/auth-guard'
import { guestGuard } from './guards/guest-guard'
import { ConsultEmployeeComponent } from './components/employees/consult/consult.component'
import { CreateEmployeeComponent } from './components/employees/create/create.component'
import { UpdateEmployeeComponent } from './components/employees/update/update.component'

export const routes: Routes = [
    //{ path: '**', component: PageNotFoundComponent },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [guestGuard]
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'employee/consult',
        component: ConsultEmployeeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'employee/create',
        component: CreateEmployeeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'employee/update/:id',
        component: UpdateEmployeeComponent,
        canActivate: [authGuard]
    }
]
