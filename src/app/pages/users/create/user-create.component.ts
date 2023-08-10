import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "@service/user.service";

@Component({
    selector: 'user-create',
    templateUrl: './user-create.component.html'
})
export class UserCreateComponent {

    constructor(private userService: UserService,
        private fb: NonNullableFormBuilder,
        private router: Router){}

    createUserForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        roleId: [2, Validators.required],
        profileName: ['', Validators.required],
        profilePhone: ['', Validators.required],
        profileAddress: ['', Validators.required],
        file: '',
        fileFormat: ''
    })

    createAccount(){
        const data = this.createUserForm.getRawValue()
        this.userService.createUser(data, true).subscribe(result => {
            this.router.navigateByUrl("/users")
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

                this.createUserForm.patchValue(
                    {
                        file: resultBase64,
                        fileFormat: resultExtension
                    }
                )
            })
        }
    }
}