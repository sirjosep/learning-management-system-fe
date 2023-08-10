import { Component, OnInit } from '@angular/core'
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LearningTaskService } from '@service/learning-task.service';

@Component({
    selector: 'create-task',
    templateUrl: './create-task.component.html'
})
export class CreateTaskComponent implements OnInit{

    learnId!: number

    constructor(private taskService: LearningTaskService,
        private activatedRoute: ActivatedRoute,
        private fb: NonNullableFormBuilder) { }

    createTaskForm = this.fb.group({
        learningTaskTitle: ['', Validators.required],
        learningTaskDesc: ['', Validators.required],
        learningTaskStart: ['', Validators.required],
        learningTaskEnd: ['', Validators.required],
        learnId: [0, Validators.required]
    })

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(result => {
            this.learnId = result['id']
        })
    }

    createTask(){
        const data = this.createTaskForm.getRawValue()
        data.learnId = this.learnId
        this.taskService.createTask(data, true).subscribe()
    }
}