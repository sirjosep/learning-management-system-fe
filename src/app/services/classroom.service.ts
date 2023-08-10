import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { ClassroomResDto } from "../dto/classroom/classroom.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { ClassroomReqDto } from "../dto/classroom/classroom.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class ClassroomService {

    constructor(private base:BaseService){}

    getAll(withToken: boolean): Observable<ClassroomResDto[]>{
        return this.base.get<ClassroomResDto[]>(`${BASE_URL}/classes`, withToken)
    }

    getUnenrolled(withToken: boolean): Observable<ClassroomResDto[]> {
        return this.base.get<ClassroomResDto[]>(`${BASE_URL}/classes/un-enrolled`, withToken)
    }

    getClassDetail(classId: number, withToken: boolean): Observable<ClassroomResDto> {
        return this.base.get<ClassroomResDto>(`${BASE_URL}/classes/details/?classId=${classId}`, withToken)
    }

    createClassroom(data: ClassroomReqDto, withToken: boolean): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/classes`, data, withToken)
    }
}