import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ClassroomResDto } from "@dto/classroom/classroom.res.dto";
import { EnrollClassResDto } from "@dto/enrollclass/enroll-class.res.dto";
import { LearningResDto } from "@dto/learning/learning.res.dto";
import { AttendanceService } from "@service/attendance.service";
import { AuthService } from "@service/auth.service";
import { ClassroomService } from "@service/classroom.service";
import { EnrollClassService } from "@service/enroll-class.service";
import { LearningService } from "@service/learning.service";
import { RoleCode } from "src/app/constant/enum-constant";

@Component({
    selector: "classroom-detail",
    templateUrl: "./classroom-detail.component.html"
})
export class ClassroomDetailComponent implements OnInit{

    learnings!: LearningResDto[]
    learningId!: number
    classDetail!: ClassroomResDto
    enrollSize!: number
    classId!: number
    accountRoleCode!: string

    constructor(private classroomService: ClassroomService,
        private authService: AuthService,
        private enrollService: EnrollClassService,
        private learningService: LearningService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private fb: NonNullableFormBuilder) { }

    createLearningForm = this.fb.group({
        learningTitle: ['', Validators.required],
        learningDateStart: ['', Validators.required],
        learningDateEnd: ['', Validators.required],
        classId: [0, Validators.required]
    })

    ngOnInit(): void {
        const profile = this.authService.getProfile()
        if(profile) {
            this.accountRoleCode = profile.roleCode
        }

        this.activatedRoute.params.subscribe(result => {
            this.classId = result['id']
        })

        this.getLearning()
        this.getClassroomDetail()
        this.getEnrolls()
    }

    createLearning() {
        const data = this.createLearningForm.getRawValue()
        data.classId = this.classId
        this.learningService.createLearning(data, true).subscribe(result => {
            this.getLearning()
        })
    }
    getLearning() {
        this.learningService.getAll(this.classId, true).subscribe(result => {
            this.learnings = result
        })
    }

    getEnrolls() {
        this.enrollService.getAllByClass(this.classId, true).subscribe(result => {
            this.enrollSize = result.length
        })
    }

    getClassroomDetail() {
        this.classroomService.getClassDetail(this.classId, true).subscribe(result => {
            this.classDetail = result
        })
    }

    toLearningDetail(id: number) {
        this.router.navigateByUrl(`/learnings/details/${id}`)
    }

    get isTeacher(){
        return RoleCode.TEACHER === this.accountRoleCode
    }
    get isStudent(){
        return RoleCode.STUDENT === this.accountRoleCode
    }
}