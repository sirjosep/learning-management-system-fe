import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { EnrollClassResDto } from "../dto/enrollclass/enroll-class.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { EnrollClassReqDto } from "../dto/enrollclass/enroll-class.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class EnrollClassService {

    constructor(private base:BaseService){}

    getAllByClass(classId: number, withToken: boolean): Observable<EnrollClassResDto[]> {
        return this.base.get<EnrollClassResDto[]>(`${BASE_URL}/enrolls/?classId=${classId}`, withToken)
    }

    enrollClass(data: EnrollClassReqDto, withToken: boolean): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/enrolls`, data, withToken)
    }
}