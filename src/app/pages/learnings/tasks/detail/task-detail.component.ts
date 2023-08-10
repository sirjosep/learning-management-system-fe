import { Component, OnInit } from '@angular/core'
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileDto } from '@dto/file/file.dto';
import { QuestionAnswerDto } from '@dto/learning/task/answer/question-answer.dto';
import { LearningTaskResDto } from '@dto/learning/task/learning-task.res.dto';
import { QuestionResDto } from '@dto/learning/task/question/question-res.dto';
import { AuthService } from '@service/auth.service';
import { LearningTaskService } from '@service/learning-task.service';
import { QuestionAnswerService } from '@service/question-answer.service';
import { QuestionService } from '@service/question.service';
import { RoleCode } from 'src/app/constant/enum-constant';

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html'
})
export class TaskDetailComponent implements OnInit {

    taskId!: number
    learnId!: number
    taskDetail!: LearningTaskResDto
    questions!: QuestionResDto[]
    answers: QuestionAnswerDto[] = []
    files: FileDto[] = []
    accountRoleCode!: string

    constructor(private learningTaskService: LearningTaskService,
        private answerService: QuestionAnswerService,
        private auth: AuthService,
        private questionService: QuestionService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private fb: NonNullableFormBuilder) { }

    createAnswerForm = this.fb.group({
        taskId: [0, Validators.required],
        answers: this.fb.array(this.answers)
    })

    ngOnInit(): void {
        const profile = this.auth.getProfile()
        if (profile) {
            this.accountRoleCode = profile.roleCode
        }

        this.activatedRoute.params.subscribe(result => {
            this.taskId = result['taskId']
            this.learnId = result['id']
        })

        this.getDetail()
        this.getQuestion()
    }

    get answerLists() {
        return this.createAnswerForm.get('answers') as FormArray
    }

    getAnswerFiles(index: number) {
        return this.answerLists.at(index).get('answerFiles') as FormArray
    }

    getDetail() {
        this.learningTaskService.getDetail(this.taskId, true).subscribe(result => {
            this.taskDetail = result
        })
    }

    getQuestion() {
        this.questionService.getAll(this.taskId, true).subscribe(result => {
            this.questions = result
            for(let r of result){
                this.answerLists.push(this.fb.group({
                    questionId: [r.id, Validators.required],
                    questionOptions: [null, Validators.required],
                    questionAnswer: [null, Validators.required],
                    answerFiles: this.fb.array(this.files)
                }))
            }
        })
    }

    toCreateQuestion() {
        this.router.navigateByUrl(`learnings/details/${this.learnId}/task/${this.taskId}/question/new`)
    }

    toStudentAnswer(id: number){
        this.router.navigateByUrl(`learnings/details/${this.learnId}/task/${this.taskId}/question/${id}/answers`)
    }

    toReviewList(){
        this.router.navigateByUrl(`learnings/details/${this.learnId}/task/${this.taskId}/review`)
    }

    isEssay(index: number): boolean {
        return this.questions[index].fileIds == null && this.questions[index].options == null
    }

    isFiles(index: number): boolean {
        return this.questions[index].fileIds != null
    }

    isMultiple(index: number): boolean {
        return this.questions[index].options != null
    }

    optionsClass(id: number): string {
        return `answerOptions-${id}`
    }

    get isTeacher() {
        return RoleCode.TEACHER === this.accountRoleCode
    }

    get isStudent() {
        return RoleCode.STUDENT === this.accountRoleCode
    }
    
    submitAnswer() {
        const data = this.createAnswerForm.getRawValue()
        data.taskId = this.taskId
        this.answerService.submitAnswer(data, true).subscribe()
    }

    fileUpload(event: any, index: number) {
        this.getAnswerFiles(index).clear()
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
                this.getAnswerFiles(index).push(this.fb.control({
                    files: result.substring(result.indexOf(",") + 1, result.length),
                    fileFormat: file.name.substring(file.name.indexOf(".") + 1, file.name.length)
                }))
            })
        }
    }
}