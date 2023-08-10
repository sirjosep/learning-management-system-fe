import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {

    loading: boolean = false

    registerForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        roleId: [3, Validators.required],
        profileName: ['', Validators.required],
        profilePhone: ['', Validators.required],
        profileAddress: ['', Validators.required],
        file: '',
        fileFormat: ''
    })

    constructor(private userService: UserService,
        private fb: NonNullableFormBuilder,
        private router: Router) { }

    createAccount(){
        this.loading = true
        const data = this.registerForm.getRawValue()
        this.userService.registerStudent(data, false).subscribe(result => {
            this.loading = false
            this.router.navigateByUrl('/login')
        })
    }
    fileUpload(event: any) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        for (let file of event.target.files) {
            toBase64(file).then(result => {
                const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)

                this.registerForm.patchValue(
                    {
                        file: resultBase64,
                        fileFormat: resultExtension
                    }
                )
            })
        }
    }
}