import { Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AttendanceResDto } from "@dto/attendance/attendance.res.dto";
import { ForumCommentResDto } from "@dto/forum/comment/forum-comment.res.dto";
import { ForumResDto } from "@dto/forum/forum.res.dto";
import { LearningResDto } from "@dto/learning/learning.res.dto";
import { LearningMaterialResDto } from "@dto/learning/material/learning-material.res.dto";
import { LearningTaskResDto } from "@dto/learning/task/learning-task.res.dto";
import { AttendanceService } from "@service/attendance.service";
import { AuthService } from "@service/auth.service";
import { ForumCommentService } from "@service/forum-comment.service";
import { ForumSerivce } from "@service/forum.service";
import { LearningMaterialService } from "@service/learning-material.service";
import { LearningTaskService } from "@service/learning-task.service";
import { LearningService } from "@service/learning.service";
import { RoleCode } from "src/app/constant/enum-constant";

@Component({
    selector: "learning-detail",
    templateUrl: "./learning-detail.component.html"
})
export class LearningDetailComponent implements OnInit {

    learningDetail?: LearningResDto
    learningMaterials!: LearningMaterialResDto[]
    learningTasks?: LearningTaskResDto[]
    forum?: ForumResDto
    forumComments!: ForumCommentResDto[]
    attendances!: AttendanceResDto[]
    attendance!: AttendanceResDto
    attendanceId: number[] = []
    learningId!: number
    accountId!: number
    accountRoleCode!: string
    attendStatus!: string
    attendClass!: string
    isAttendanceApprove = false

    constructor(private learningService: LearningService,
        private learningMaterialService: LearningMaterialService,
        private learningTaskService: LearningTaskService,
        private forumService: ForumSerivce,
        private forumCommentService: ForumCommentService,
        private attendanceService: AttendanceService,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private fb: NonNullableFormBuilder) { }

    ngOnInit(): void {
        const profile = this.authService.getProfile()
        if(profile){
            this.accountId = profile.userId
            this.accountRoleCode = profile.roleCode
        }
        
        this.activatedRoute.params.subscribe(result => {
            this.learningId = result['id']
            this.getLearningDetail()
            this.getForum()
            this.getAttendances()
            this.getLearningMaterial()
            this.getLearningTask()
        })
        this.isAttend()
        this.isAttendApproved()
    }

    forumCommentForm = this.fb.group({
        commentBody: ['', Validators.required],
        forumId: [0, Validators.required],
    })

    insertComment() {
        const data = this.forumCommentForm.getRawValue()
        data.forumId = this.forum!.id
        this.forumCommentService.createComment(data, true).subscribe(result => {
            this.getForumComment()
        })
    }

    attendLearningForm = this.fb.group({
        learnId: [0, Validators.required]
    })

    attendLearning(){
        const data = this.attendLearningForm.getRawValue()
        data.learnId = this.learningId
        this.attendanceService.createAttend(data, true).subscribe()
    }

    isAttend() {
        this.attendanceService.getAttendStatus(this.learningId, true).subscribe(result => {
            if(result.isApprove){
                this.attendStatus = "Approved"
                this.attendClass = "text-success"
            } else if(!result.isApprove){
                this.attendStatus = "Not approved"
                this.attendClass = "text-danger"
            } else if(result == null){
                this.attendStatus = "Not attend yet"
                this.attendClass = "text-muted"
            }
        })
    }

    isAttendApproved() {
        this.attendanceService.getAttendStatus(this.learningId, true).subscribe(result => {
            this.attendance = result

            if(this.isStudent && this.attendance.isApprove){
                this.isAttendanceApprove = true
            } else {
                this.isAttendanceApprove = false
            }
        })
    }

    approveAttendanceForm = this.fb.group({
        id: this.fb.array(this.attendanceId)
    })

    isApproved(approveStatus: boolean): boolean{
        return approveStatus
    }

    get attendId(){
        return this.approveAttendanceForm.get('id') as FormArray
    }

    addAttendId(e:any, id:number){
        let isFound = false
        const data = this.approveAttendanceForm.getRawValue()
        for(let i =0; i<data.id.length; i++){
            if(data.id[i] == id){
                this.attendId.removeAt(i)
                isFound = true
                break
            }
        }

        if(!isFound){
            this.attendId.push(this.fb.control(id, Validators.required))
        }
    }

    approveAttendance(){
        const data = this.approveAttendanceForm.getRawValue()
        this.attendanceService.approveAttend(data, true).subscribe(result => {
            this.getAttendances()
        })
    }

    showBubble(userId: number): string{
        if(this.accountId == userId){
            return "col-md-4 offset-md-8"
        } else {
            return "col-md-4"
        }
    }

    getLearningDetail() {
        this.learningService.getDetail(this.learningId, true).subscribe(result => {
            this.learningDetail = result
        })
    }

    getLearningMaterial() {
        this.learningMaterialService.getMaterial(this.learningId, true).subscribe(result => {
            this.learningMaterials = result
        })
    }

    getLearningTask() {
        this.learningTaskService.getAll(this.learningId, true).subscribe(result => {
            this.learningTasks = result
        })
    }

    getForum() {
        this.forumService.getForum(this.learningId, true).subscribe(result => {
            this.forum = result
            this.getForumComment()
        })
    }

    getForumComment(){
        this.forumCommentService.getForumComment(this.forum!.id, true).subscribe(result => {
            this.forumComments = result
        })
    }

    getAttendances() {
        this.attendanceService.getAllByLearning(this.learningId, true).subscribe(result => {
            this.attendances = result
        })
    }

    get isTeacher(){
        return RoleCode.TEACHER === this.accountRoleCode
    }

    get isStudent(){
        return RoleCode.STUDENT === this.accountRoleCode
    }

    toCreateMaterial() {
        this.router.navigateByUrl(`learnings/details/${this.learningId}/material/new`)
    }

    toCreateTask() {
        this.router.navigateByUrl(`learnings/details/${this.learningId}/task`)
    }

    toTaskDetail(taskId:number) {
        this.router.navigateByUrl(`learnings/details/${this.learningId}/task/${taskId}`)
    }

    materialClassName(id: number): string {
        return `learningMaterial-${id}`
    }

    taskClassName(id: number): string {
        return `learningTask-${id}`
    }
    
    isPictureExist(id: number):boolean {
        return id != null
    }
    
    isPictureNotExist(id: number):boolean {
        return id == null
    }
}