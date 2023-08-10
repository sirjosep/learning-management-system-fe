import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { ForumCommentResDto } from "../dto/forum/comment/forum-comment.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { ForumCommentReqDto } from "../dto/forum/comment/forum-comment.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class ForumCommentService {

    constructor(private base:BaseService){}

    getForumComment(forumId: number, withToken: boolean): Observable<ForumCommentResDto[]> {
        return this.base.get<ForumCommentResDto[]>(`${BASE_URL}/comments/?forumId=${forumId}`, withToken)
    }

    createComment(data: ForumCommentReqDto, withToken: boolean): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/comments`, data, withToken)
    }
}