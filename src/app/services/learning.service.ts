import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { LearningResDto } from "../dto/learning/learning.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { LearningReqDto } from "../dto/learning/learning.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class LearningService {

    constructor(private base:BaseService){}

    getAll(classId: number, withToken: boolean): Observable<LearningResDto[]>{
        return this.base.get<LearningResDto[]>(`${BASE_URL}/learnings/?classId=${classId}`, withToken)
    }

    getDetail(learningId: number, withToken: boolean): Observable<LearningResDto>{
        return this.base.get<LearningResDto>(`${BASE_URL}/learnings/details/?learnId=${learningId}`, withToken)
    }

    createLearning(data: LearningReqDto, withToken: boolean): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/learnings`, data, withToken)
    }
}