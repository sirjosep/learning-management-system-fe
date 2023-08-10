import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassroomResDto } from '@dto/classroom/classroom.res.dto';
import { EnrollClassResDto } from '@dto/enrollclass/enroll-class.res.dto';
import { UsersResDto } from '@dto/user/user.res.dto';
import { AuthService } from '@service/auth.service';
import { ClassroomService } from '@service/classroom.service';
import { EnrollClassService } from '@service/enroll-class.service';
import { UserService } from '@service/user.service';
import { RoleCode } from 'src/app/constant/enum-constant';

@Component({
    selector: "classroom-list",
    templateUrl: "./classroom-list.component.html"
})
export class ClassroomListComponent implements OnInit {

    classes!: ClassroomResDto[]
    unenrolledClasses!: ClassroomResDto[]
    teachers!: UsersResDto[]
    accountId!: number
    accountRoleCode!: string
    classId!: number
    enrollClasses!: EnrollClassResDto[]

    constructor(private classroomService: ClassroomService,
        private enrollService: EnrollClassService,
        private authService: AuthService,
        private router: Router,
        private userService: UserService,
        private fb: NonNullableFormBuilder) { }

    createClassroomForm = this.fb.group({
        classCode: ['', Validators.required],
        className: ['', Validators.required],
        teacherId: [0, Validators.required],
        files: '',
        fileFormat: ''
    })
    
    enrollClassForm= this.fb.group({
        classId: [0, Validators.required]
    })

    ngOnInit(): void {
        const profile = this.authService.getProfile()
        if(profile) {
            this.accountId = profile.userId 
            this.accountRoleCode = profile.roleCode
        }
        this.getClassroom()
        this.getTeachers()
        this.getUnenrolledClass()
    }

    getClassroom() {
        this.classroomService.getAll(true).subscribe(result => {
            this.classes = result
        })
    }

    getUnenrolledClass() {
        this.classroomService.getUnenrolled(true).subscribe(result => {
            this.unenrolledClasses = result
        })
    }

    getTeachers() {
        this.userService.getAll(RoleCode.TEACHER, true).subscribe(result => {
            this.teachers = result
        })
    }

    createClassroom() {
        const data = this.createClassroomForm.getRawValue()
        this.classroomService.createClassroom(data, true).subscribe(result => {
            this.getClassroom()
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

                this.createClassroomForm.patchValue(
                    {
                        files: resultBase64,
                        fileFormat: resultExtension
                    }
                )
            })
        }
    }

    getDetail(id: number){
        this.router.navigateByUrl(`/classrooms/details/${id}`)
    }

    setClassId(classId: number){
        this.classId = classId
    }

    enrollClass(){
        const data = this.enrollClassForm.getRawValue()
        data.classId = this.classId
        this.enrollService.enrollClass(data, true).subscribe(result => {
            this.getClassroom()
            this.getUnenrolledClass()
        })
    }

    isEnroll(classId: number): boolean{
        this.enrollService.getAllByClass(classId, true).subscribe(result => {
            this.enrollClasses = result
        })

        for(let r = 0; r < this.enrollClasses.length; r++){
            if(this.enrollClasses[r].studId == this.accountId){
                return false
            }
        }
        return true
    }

    get isAdmin(){
        return RoleCode.ADMIN === this.accountRoleCode
    }

    get isStudent(){
        return RoleCode.STUDENT === this.accountRoleCode
    }

    get isTeacher(){
        return RoleCode.TEACHER === this.accountRoleCode
    }

}