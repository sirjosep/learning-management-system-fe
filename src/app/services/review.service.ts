import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { ReviewResDto } from "../dto/review/review.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { UpdateReviewReqDto } from "../dto/review/update.review.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    
    constructor(private base: BaseService){}

    getReviewList(teacherId: number, taskId: number, withToken: boolean): Observable<ReviewResDto[]> {
        return this.base.get<ReviewResDto[]>(`${BASE_URL}/reviews/?teacherId=${teacherId}&taskId=${taskId}`, withToken)
    }

    updateReview(data: UpdateReviewReqDto, withToken: boolean): Observable<UpdateResDto> {
        return this.base.put<UpdateResDto>(`${BASE_URL}/reviews`, data, withToken)
    }
}