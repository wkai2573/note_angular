@Component({
  selector: 'app-元件',                 //在HTML使用的tag名
  templateUrl: './元件.component.html', //載入HTML
  styleUrls: ['./元件.component.css']   //載入樣式
})
export class 元件Component {

	//==參數==
	num = 1;
  str = "字串";
	fooList:Foo[] = [new Foo()];
	
	//==注入服務==
	constructor(
		private fooService: FooService,
		private barService: BarService) {}

	//==方法==

	//取得清單
	getFooList() {
		this.fooService.getFooList().subscribe(fooList => {
			this.fooList = fooList;
		});
	}

	//==事件==


	//==事件:生命週期==

	ngOnInit(): void {
		this.getFooList();
	}

}
