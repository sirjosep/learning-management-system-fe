import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RoleCode } from "src/app/constant/enum-constant";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

    imgUrl!: string
    accountRoleCode!: string

    constructor (private router: Router, private auth: AuthService){}

    ngOnInit(): void {
        const profile = this.auth.getProfile()
        if(profile){
            this.accountRoleCode = profile.roleCode
            if (profile.fileId != null){
                this.imgUrl = `http://localhost:8080/files/${profile.fileId}`
            }
        }
    }

    get isAdmin() : boolean {
        return this.accountRoleCode == RoleCode.ADMIN
    }

    get isTeacher() : boolean {
        return this.accountRoleCode == RoleCode.TEACHER
    }

    get isStudent() : boolean {
        return this.accountRoleCode == RoleCode.STUDENT
    }

    get isPictureExist():boolean {
        return this.auth.getProfile()?.fileId != null
    }
    
    get isPictureNotExist():boolean {
        return this.auth.getProfile()?.fileId == null
    }

    logout() {
        localStorage.removeItem("data")
        this.router.navigateByUrl("/login")
    }
}