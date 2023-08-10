import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { UserService } from "@service/user.service";

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {

    constructor(private userService: UserService,
        private fb: NonNullableFormBuilder) {}

    changePasswordForm = this.fb.group({
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmNewPassword: ['', Validators.required]
    });

    changePassword() {
        const data = this.changePasswordForm.getRawValue()
        if(data.newPassword == data.confirmNewPassword){
            this.userService.changePassword(data,true).subscribe()
        }
    }
}