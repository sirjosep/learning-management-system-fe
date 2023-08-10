import { Route, Router, UrlSegment } from "@angular/router"
import { AuthService } from "../services/auth.service"
import { inject } from "@angular/core"

export const authValidation = (route: Route, segments: UrlSegment[]) => {
    const auth = inject(AuthService)
    const router = inject(Router)

    const profile = auth.getProfile()

    if (profile) {
        router.navigateByUrl('/dashboard')
    } else {
        if (route.path !== 'login'){
            router.navigateByUrl('/login')
        }
    }

    return true
}

export const registerValidation = (route: Route, segments: UrlSegment[]) => {
    const auth = inject(AuthService)
    const router = inject(Router)

    const profile = auth.getProfile()

    if (profile) {
        router.navigateByUrl('/dashboard')
    } else {
        if (route.path !== 'register'){
            router.navigateByUrl('/register')
        }
    }

    return true
}

export const nonLoginAuthValidation = (route: Route, segments: UrlSegment[]) => {
    const auth = inject(AuthService)
    const router = inject(Router)

    const profile = auth.getProfile()

    if(!profile){
        router.navigateByUrl('/login')
    }

    return true
}