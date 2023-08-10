import { Component, OnInit } from '@angular/core'
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { FileDto } from '@dto/file/file.dto'
import { QuestionOptionDto } from '@dto/learning/task/question/question-option.dto'
import { LearningTaskService } from '@service/learning-task.service'
import { QuestionService } from '@service/question.service'

@Component({
    selector: 'create-question',
    templateUrl: './create-question.component.html'
})
export class CreateQuestionComponent implements OnInit{

    taskId!: number
    learnId!: number
    questionOptionDto: QuestionOptionDto[] = []
    fileDto: FileDto[] = []

    constructor(private questionService: QuestionService,
        private activatedRoute: ActivatedRoute,
        private fb: NonNullableFormBuilder) { }

    createQuestionForm = this.fb.group({
        questionCode: ['', Validators.required],
        questionBody: ['', Validators.required],
        taskId: [0, Validators.required],
        options: this.fb.array(this.questionOptionDto),
        files: this.fb.array(this.fileDto)
    })

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(result => {
            this.taskId = result['taskId']
            this.learnId = result['id']
        })
    }

    createQuestion(){
        const data = this.createQuestionForm.getRawValue()
        data.taskId = this.taskId
        this.questionService.createQuestion(data, true).subscribe()
    }

    get options() {
        return this.createQuestionForm.get('options') as FormArray
    }

    get files() {
        return this.createQuestionForm.get('files') as FormArray
    }

    onAdd() {
        this.options.push(this.fb.group({
            optionsLabel: '',
            isCorrect: false
        }))
    }

    onRemove(i: number) {
        this.options.removeAt(i)
    }

    fileUpload(event: any) {
        this.files.clear()
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
                this.files.push(this.fb.control({
                    files: result.substring(result.indexOf(",") + 1, result.length),
                    fileFormat: file.name.substring(file.name.indexOf(".") + 1, file.name.length)
                }))
            })
        }
    }
}