@Injectable({
	providedIn: 'root' //全專案可注入
})
export class FooService {
	fooList: string[] = [];

	add(foo: string) {
		this.fooList.push(foo);
	}

	clear() {
		this.fooList = [];
	}
}
