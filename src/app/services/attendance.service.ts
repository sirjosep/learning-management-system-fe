import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { AttendanceResDto } from "../dto/attendance/attendance.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { AttendanceUpdateReqDto } from "../dto/attendance/attendance-update.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { AttendanceReqDto } from "../dto/attendance/attendance.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class AttendanceService {

    constructor(private base: BaseService) {}

    getAllByLearning(learningId: number, withToken: boolean): Observable<AttendanceResDto[]> {
        return this.base.get<AttendanceResDto[]>(`${BASE_URL}/attendances/?learnId=${learningId}`, withToken)
    }

    getAttendStatus(learningId: number, withToken: boolean): Observable<AttendanceResDto> {
        return this.base.get<AttendanceResDto>(`${BASE_URL}/attendances/details/?learnId=${learningId}`, withToken)
    }

    approveAttend(data: AttendanceUpdateReqDto, withToken: boolean): Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>(`${BASE_URL}/attendances`, data, withToken)
    }

    createAttend(data: AttendanceReqDto, withToken: boolean): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/attendances`, data, withToken)
    }
}