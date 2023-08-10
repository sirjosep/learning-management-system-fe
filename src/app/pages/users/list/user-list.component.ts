import { Component, OnInit } from "@angular/core"
import { UsersResDto } from "@dto/user/user.res.dto"
import { UserService } from "@service/user.service"

@Component({
    selector: "user-list",
    templateUrl: "./user-list.component.html"
})
export class UserListComponent implements OnInit{

    users!: UsersResDto[]

    constructor(private userService: UserService){}

    ngOnInit(){
        this.getUsers()
    }

    getUsers(){
        this.userService.getAll('', true).subscribe(result => {
            this.users = result
        })    
    }
}