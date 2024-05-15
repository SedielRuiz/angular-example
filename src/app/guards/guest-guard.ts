import { inject } from '@angular/core'
import { Router } from '@angular/router'

export const guestGuard = () => {

    const router = inject(Router)

    localStorage.getItem('token') ? router.navigate(['/dashboard']) : true

}
