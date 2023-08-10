import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit{

    fullName!: string

    constructor(private auth: AuthService){}

    ngOnInit(): void {
        this.getFullName()
    }
    
    getFullName() {
        const data = this.auth.getProfile()
        if(data) {
            this.fullName = data.profileName
        }
    }
}