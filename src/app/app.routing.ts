import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LoginComponent } from "./pages/login/login.component";
import { BaseComponent } from "./component/base/base.component";
import { NotFoundComponent } from "./component/not-found/not-found.component";
import { BaseModule } from "./component/base/base.module";
import { RegisterComponent } from "./pages/register/register.component";
import { authValidation, nonLoginAuthValidation, registerValidation } from "./validation/auth.validation";
import { ButtonComponent } from "./component/button/button.component";

const routes: Routes = [
    {
        component: BaseComponent,
        path: 'users',
        loadChildren: () => import('./pages/users/user.module').then(u => u.UserModule),
        canMatch: [ nonLoginAuthValidation ]
    },
    {
        component: BaseComponent,
        path: 'classrooms',
        loadChildren: () => import('./pages/classrooms/classroom.module').then(u => u.ClassroomModule),
        canMatch: [ nonLoginAuthValidation]

    },
    {
        component: BaseComponent,
        path: 'learnings',
        loadChildren: () => import('./pages/learnings/learning.module').then(u => u.LearningModule),
        canMatch: [ nonLoginAuthValidation]
    },
    {
        path: 'login',
        component: LoginComponent,
        canMatch: [ authValidation ]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canMatch: [ registerValidation ]
    },
    {
        component: BaseComponent,
        path: 'dashboard',
        children: [
            {
                path: '',
                component: DashboardComponent
            }
        ],
        canMatch: [ nonLoginAuthValidation]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]

@NgModule({
    declarations: [
        DashboardComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        BaseModule, 
        CommonModule,
        FormsModule, 
        ReactiveFormsModule,
        ButtonComponent
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting {

}