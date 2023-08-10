import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { UsersResDto } from "../dto/user/user.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { UserInsertReqDto } from "../dto/user/user-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { ProfileUpdateReqDto } from "../dto/user/profile-update.req.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { ProfilePhotoUpdateReqDto } from "../dto/user/profile-photo-update.req.dto";
import { UpdatePhotoResDto } from "../dto/update-photo.res.dto";
import { ProfileRestDto } from "@dto/user/profile.res.dto";
import { ChangePasswordReqDto } from "@dto/user/change-password.req.dto";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private base: BaseService){}

    getAll(roleCode:string, withToken: boolean): Observable<UsersResDto[]> {
        if(roleCode === ''){
            return this.base.get<UsersResDto[]>(`${BASE_URL}/users`, withToken)
        } else  {
            return this.base.get<UsersResDto[]>(`${BASE_URL}/users/?roleCode=${roleCode}`)
        }
    }

    registerStudent(data: UserInsertReqDto, withToken: boolean): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/register`, data, withToken)
    }

    createUser(data: UserInsertReqDto, withToken: boolean): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/users`, data, withToken)
    }

    editProfile(data: ProfileUpdateReqDto, withToken: boolean): Observable<UpdateResDto> {
        return this.base.put<UpdateResDto>(`${BASE_URL}/users`, data, withToken)
    }

    editPhoto(data: ProfilePhotoUpdateReqDto, withToken: boolean): Observable<UpdatePhotoResDto> {
        return this.base.patch<UpdatePhotoResDto>(`${BASE_URL}/users`, data, withToken)
    }

    getProfile(withToken: boolean): Observable<ProfileRestDto> {
        return this.base.get<ProfileRestDto>(`${BASE_URL}/users/detail`, withToken)
    } 

    changePassword(data: ChangePasswordReqDto, withToken: boolean): Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>(`${BASE_URL}/users/change-password`, data, withToken)
    }
}