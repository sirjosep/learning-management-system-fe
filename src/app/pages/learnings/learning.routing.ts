import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LearningDetailComponent } from "./detail/learning-detail.component";
import { CreateMaterialComponent } from "./materials/create/create-material.component";
import { TaskDetailComponent } from "./tasks/detail/task-detail.component";
import { CreateTaskComponent } from "./tasks/create/create-task.component";
import { CreateQuestionComponent } from "./tasks/question/create/create-question.component";
import { StudentAnswerComponent } from "./tasks/question/answer/student-answer.component";
import { ReviewStudentComponent } from "./tasks/review/list/review-student.component";
import { UrlPipe } from "src/app/pipe/url.pipe";
const routes: Routes = [
    {
        path: "details/:id",
        component: LearningDetailComponent
    },
    {
        path: "details/:id/material/new",
        component: CreateMaterialComponent
    },
    {
        path: "details/:id/task/:taskId",
        component: TaskDetailComponent
    },
    {
        path: "details/:id/task",
        component: CreateTaskComponent
    },
    {
        path: "details/:id/task/:taskId/question/new",
        component: CreateQuestionComponent
    },
    {
        path: "details/:id/task/:taskId/question/:questionId/answers",
        component: StudentAnswerComponent
    },
    {
        path: "details/:id/task/:taskId/review",
        component: ReviewStudentComponent
    }
]

@NgModule({
    declarations: [
        LearningDetailComponent,
        CreateMaterialComponent,
        TaskDetailComponent,
        CreateTaskComponent,
        CreateQuestionComponent,
        StudentAnswerComponent,
        ReviewStudentComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule, CommonModule,
        UrlPipe
    ],
    exports: [
        RouterModule,
        LearningDetailComponent,
        CreateMaterialComponent,
        TaskDetailComponent,
        CreateTaskComponent,
        CreateQuestionComponent,
        StudentAnswerComponent,
        ReviewStudentComponent
    ]
})
export class LearningRouting {

}