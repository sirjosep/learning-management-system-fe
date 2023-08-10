import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { ProfileRestDto } from "@dto/user/profile.res.dto";
import { AuthService } from "@service/auth.service";
import { UserService } from "@service/user.service";

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent {

    profile!: ProfileRestDto
    userId!: number

    constructor(private authService: AuthService,
        private fb: NonNullableFormBuilder,
        private userService: UserService) { }

    ngOnInit() {
        this.getProfile()
        const profile = this.authService.getProfile()
        if (profile) {
            this.userId = profile.userId
        }
    }

    profileUpdateDto = this.fb.group({
        profileId: [0, [Validators.required]],
        profileName: ['', [Validators.required]],
        profilePhone: ['', [Validators.required]],
        profileAddress: ['', [Validators.required]]
    })

    profileUpdatePhotoDto = this.fb.group({
        profileId: [0, [Validators.required]],
        file: ['', Validators.required],
        fileFormat: ['', Validators.required]
    })

    getProfile() {
        this.userService.getProfile(true).subscribe(result => {
            this.profile = result
            this.profileUpdateDto.patchValue({
                profileName: result.name,
                profilePhone: result.phone,
                profileAddress: result.address
            })
        })
    }

    updateProfile() {
        this.profileUpdateDto.patchValue({
            profileId: this.userId
        })

        const data = this.profileUpdateDto.getRawValue()
        this.userService.editProfile(data, true).subscribe()
    }

    updatePhoto() {
        this.profileUpdatePhotoDto.patchValue({
            profileId: this.userId
        })

        const data = this.profileUpdatePhotoDto.getRawValue()
        this.userService.editPhoto(data, true).subscribe(result => {
            const profile = this.authService.getProfile()
            if(profile) {
                profile.fileId = result.fileId
                localStorage.setItem("data", JSON.stringify(profile))
            }
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

                this.profileUpdatePhotoDto.patchValue(
                    {
                        file: resultBase64,
                        fileFormat: resultExtension
                    }
                )
            })
        }
    }
}