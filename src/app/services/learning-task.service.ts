import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { LearningTaskResDto } from "../dto/learning/task/learning-task.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { LearningTaskReqDto } from "../dto/learning/task/learning-task.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class LearningTaskService {

    constructor(private base:BaseService) {}

    getAll(learnId: number, withToken: boolean): Observable<LearningTaskResDto[]> {
        return this.base.get<LearningTaskResDto[]> (`${BASE_URL}/tasks/?learnId=${learnId}`, withToken)
    }

    getDetail(id: number, withToken: boolean): Observable<LearningTaskResDto> {
        return this.base.get<LearningTaskResDto> (`${BASE_URL}/tasks/details/?id=${id}`, withToken)
    }

    createTask(data: LearningTaskReqDto, withToken: boolean): Observable<InsertResDto> {
        return this.base.post<InsertResDto> (`${BASE_URL}/tasks`, data, withToken)
    }
}