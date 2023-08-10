import { Component } from '@angular/core'
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    loading: boolean = false

    loginReqForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    })

    constructor(private loginService: LoginService,
        private fb: NonNullableFormBuilder,
        private router: Router){}

    onLogin(){
        this.loading = true
        const data = this.loginReqForm.getRawValue()
        this.loginService.login(data, false).subscribe(result=> {
            localStorage.setItem('data', JSON.stringify(result))

            this.loading = false
            this.router.navigateByUrl('/dashboard')
        })
    }
}