import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { QuestionAnswerResDto } from "../dto/learning/task/answer/question-answer.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { QuestionAnswerReqDto } from "../dto/learning/task/answer/question-answer.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class QuestionAnswerService {

    constructor(private base: BaseService) {}

    getAnswerByQuestion(questionId: number, withToken: boolean): Observable<QuestionAnswerResDto[]> {
        return this.base.get<QuestionAnswerResDto[]>(`${BASE_URL}/answers/?questionId=${questionId}`, withToken)
    }

    submitAnswer(data: QuestionAnswerReqDto, withToken: boolean): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/answers`, data, withToken)
    }
}