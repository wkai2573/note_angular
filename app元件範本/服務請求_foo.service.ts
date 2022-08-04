@Injectable({
	providedIn: 'root'
})
export class FooService {

	//==注入==
	constructor(
		private messageService: MessageService, //注入服務
		private http: HttpClient, //請求用
	) {}

	//==屬性==
	
	//請求api
	private fooesUrl = 'api/fooList';
	//請求參數
	httpOptions = {
		headers: new HttpHeaders({'Content-Type': 'application/json'})
	};

	//==方法==

	//GET請求: 取得FooList
	getFooList(): Observable<Foo[]> {
		return this.http
			.get<Foo[]>(this.fooesUrl)
			.pipe(
				//中途紀錄
				tap(_ => this.log('fetched fooList')),
				//錯誤處理
				catchError(this.handleError<Foo[]>('getFooList', []))
			);
	}

	//GET請求: 取得指定Foo
	getFoo(id: number): Observable<Foo> {
		const url = `${this.fooesUrl}/${id}`;
		return this.http
			.get<Foo>(url)
			.pipe(
				tap(_ => this.log(`fetched foo id=${id}`)),
				catchError(this.handleError<Foo>(`getFoo id=${id}`))
			);
	}

	//PUT請求: 更新Foo至伺服器
	updateFoo(foo: Foo): Observable<any> {
		return this.http
			.put(this.fooesUrl, foo, this.httpOptions)
			.pipe(
				tap(_ => this.log(`updated foo id=${foo.id}`)),
				catchError(this.handleError<any>('updateFoo'))
			);
	}

	//POST請求: 新增Foo
	addFoo(foo: Foo): Observable<Foo> {
		return this.http
			.post<Foo>(this.fooesUrl, foo, this.httpOptions)
			.pipe(
				tap((newFoo: Foo) => this.log(`added foo w/ id=${newFoo.id}`)),
				catchError(this.handleError<Foo>('addFoo'))
			);
	}

	//DELETE請求: 刪除指定Foo
	deleteFoo(id: number): Observable<Foo> {
		const url = `${this.fooesUrl}/${id}`;
		return this.http
			.delete<Foo>(url, this.httpOptions)
			.pipe(
				tap(_ => this.log(`deleted foo id=${id}`)),
				catchError(this.handleError<Foo>('deleteFoo'))
			);
	}

	//GET請求: 查詢Foo
	searchFooList(term: string): Observable<Foo[]> {
		if (!term.trim()) return of([]);

		return this.http
			.get<Foo[]>(`${this.fooesUrl}/?name=${term}`)
			.pipe(
				tap(fooList => fooList.length ?
					this.log(`found fooList matching "${term}"`) :
					this.log(`no fooList matching "${term}"`)),
				catchError(this.handleError<Foo[]>('searchFooList', []))
			);
	}

	//紀錄訊息
	private log(message: string) {
		this.messageService.add(`FooService: ${message}`);
	}

	/**
	 * 錯誤處理器
	 * @param operation - 操作名稱
	 * @param result - 錯誤時回傳此項目
	 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			this.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}
}
