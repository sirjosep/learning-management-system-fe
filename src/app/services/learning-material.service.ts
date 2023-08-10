import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { LearningMaterialResDto } from "../dto/learning/material/learning-material.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { LearningMaterialReqDto } from "../dto/learning/material/learning-material.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class LearningMaterialService {

    constructor(private base:BaseService){}

    getMaterial(learnId: number, withToken: boolean): Observable<LearningMaterialResDto[]> {
        return this.base.get<LearningMaterialResDto[]>(`${BASE_URL}/materials/?learnId=${learnId}`, withToken)
    }

    createMaterial(data: LearningMaterialReqDto, withToken: boolean): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/materials`, data, withToken)
    }
}