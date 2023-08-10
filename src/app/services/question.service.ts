import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { QuestionResDto } from "../dto/learning/task/question/question-res.dto";
import { BASE_URL } from "../constant/api.constant";
import { QuestionReqDto } from "../dto/learning/task/question/qeustion.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    constructor(private base: BaseService){}

    getAll(taskId: number, withToken: boolean): Observable<QuestionResDto[]> {
        return this.base.get<QuestionResDto[]>(`${BASE_URL}/questions/?taskId=${taskId}`, withToken)
    }

    createQuestion(data: QuestionReqDto, withToken: boolean): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/questions`, data, withToken)
    }
}