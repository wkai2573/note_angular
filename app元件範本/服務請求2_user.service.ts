import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';

//使用者
export interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;
}

//使用者請求回應
export interface UserListResponse {
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
	data: User[];
	support: Object;
}

//服務
@Injectable({providedIn: 'root'})
export class UserService {
	constructor(
		private http: HttpClient,
	) {}

	private apiUrl = 'https://reqres.in/api';

	getUsers(page: number = 0): Observable<UserListResponse> {
		const url = `${this.apiUrl}/users?page=${page + 1}`;
		return this.http
			.get<UserListResponse>(url)
			.pipe(
				//請求失敗, 給預設值
				catchError((error: any): Observable<UserListResponse> => {
					return of();
				})
			);
	}
}
