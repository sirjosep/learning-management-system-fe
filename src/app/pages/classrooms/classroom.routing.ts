import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ClassroomListComponent } from "./lists/classroom-list.component";
import { ClassroomDetailComponent } from "./detail/classroom-detail.component";
import { UrlPipe } from "src/app/pipe/url.pipe";

const routes: Routes = [
    {
        path: "",
        component: ClassroomListComponent
    },
    {
        path: "details/:id",
        component: ClassroomDetailComponent
    }
]

@NgModule({
    declarations: [
        ClassroomListComponent,
        ClassroomDetailComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule, CommonModule,
        UrlPipe
    ], 
    exports: [
        RouterModule,
        ClassroomListComponent,
        ClassroomDetailComponent
    ]
})
export class ClassroomRouting {

}