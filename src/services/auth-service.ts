import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../enviroments/enviroment";
import { UserModel } from "../models/user-model";
import { LoginModel } from "../models/login-model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private url = environment.apiUrl + '/auth';

    constructor(private http: HttpClient){}

    login(loginModel: LoginModel): Observable<any> {
        return this.http.post<any>(`${this.url}/login`, loginModel);
    }

    register(loginModel: LoginModel): Observable<UserModel> {
        return this.http.post<UserModel>(`${this.url}/register`, loginModel);
    }
}