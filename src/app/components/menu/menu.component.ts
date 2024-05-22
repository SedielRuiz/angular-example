import { Component, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { UsersService } from '../../services/users.service'
import { CommonModule } from '@angular/common'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'

@Component({
    selector: 'menu-component',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css'
})
export class MenuComponent {

    userService = inject(UsersService)

    constructor(
        private router: Router,
    ) {}

    logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('singIn')
        this.router.navigate(['/login'])
    }
}
