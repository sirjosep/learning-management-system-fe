import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { QuestionAnswerResDto } from '@dto/learning/task/answer/question-answer.res.dto';
import { QuestionAnswerService } from '@service/question-answer.service';

@Component({
    selector: 'student-answer',
    templateUrl: './student-answer.component.html'
})
export class StudentAnswerComponent implements OnInit{

    answers!: QuestionAnswerResDto[]
    questionId!: number
    constructor(private questionAnswerService: QuestionAnswerService,
            private activatedRoute: ActivatedRoute){}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(result => {
            this.questionId = result['questionId']
        })
        this.getAnswers()
    }

    getAnswers(){
        this.questionAnswerService.getAnswerByQuestion(this.questionId, true).subscribe(answerRes => {
            this.answers = answerRes
        })
    }

    isEssay(index: number): boolean {
        return this.answers[index].fileIds == null && this.answers[index].questionOptions == null
    }

    isFiles(index: number): boolean {
        return this.answers[index].fileIds != null
    }
    isMultiple(index: number): boolean {
        return this.answers[index].questionOptions != null
    }
}