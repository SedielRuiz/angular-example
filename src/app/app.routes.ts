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
import { ConsultEmployeeAfiliationsComponent } from './components/employee-afiliations/consult/consult.component'
import { CreateEmployeeAfiliationsComponent } from './components/employee-afiliations/create/create.component'
import { UpdateEmployeeAfiliationsComponent } from './components/employee-afiliations/update/update.component'

import { CreateRelativesComponent } from './components/relatives/create/create.component'
import { ConsultRelativesComponent } from './components/relatives/consult/consult.component'
import { UpdateRelativeComponent } from './components/relatives/update/update.component'

import { CreateDocumentComponent } from './components/documents/create/create.component'
import { ConsultDocumentsComponent } from './components/documents/consult/consult.component'
import { UpdateDocumentComponent } from './components/documents/update/update.component'

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
    },
    {
        path: 'employee/afiliation/consult',
        component: ConsultEmployeeAfiliationsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'employee/afiliation/create',
        component: CreateEmployeeAfiliationsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'employee/afiliation/update/:id',
        component: UpdateEmployeeAfiliationsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'employee/relatives/all',
        component: CreateRelativesComponent,
        canActivate: [authGuard]
    },
    {
        path: 'employee/relatives/create',
        component: CreateRelativesComponent,
        canActivate: [authGuard]
    },
    {
        path: 'employee/relatives/consult/:id',
        component: ConsultRelativesComponent,
        canActivate: [authGuard]
    },
    {
        path: 'employee/relatives/update/:id',
        component: UpdateRelativeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'employee/documents/consult',
        component: ConsultDocumentsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'employee/documents/create',
        component: CreateDocumentComponent,
        canActivate: [authGuard]
    },
    {
        path: 'employee/documents/update/:id',
        component: UpdateDocumentComponent,
        canActivate: [authGuard]
    },
]
