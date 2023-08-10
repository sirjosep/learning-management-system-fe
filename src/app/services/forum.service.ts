import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { ForumResDto } from "../dto/forum/forum.res.dto";
import { BASE_URL } from "../constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class ForumSerivce {

    constructor(private base: BaseService){}

    getForum(learnId: number, withToken: boolean): Observable<ForumResDto>{
        return this.base.get<ForumResDto>(`${BASE_URL}/forums/?learningId=${learnId}`, withToken)
    }
}