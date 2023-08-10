import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { UserCreateComponent } from "./create/user-create.component"
import { UserListComponent } from "./list/user-list.component"
import { ReactiveFormsModule } from "@angular/forms";
import { RoleCode } from "src/app/constant/enum-constant";
import { roleValidation } from "src/app/validation/role.validation";
import { ProfileComponent } from "./profile/profile.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

const routes: Routes = [
    {
        path: '',
        component: UserListComponent,
        data: [RoleCode.ADMIN],
        canMatch: [roleValidation]
    },
    {
        path: 'new',
        component: UserCreateComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent
    },
]

@NgModule({
    declarations: [
        UserListComponent,
        UserCreateComponent,
        ProfileComponent,
        ChangePasswordComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule, CommonModule
    ],
    exports: [
        RouterModule,
        UserListComponent,
        UserCreateComponent,
        ProfileComponent,
        ChangePasswordComponent
    ]
})
export class UserRouting {

}