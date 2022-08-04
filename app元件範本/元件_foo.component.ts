@Component({
  selector: 'app-元件',                 //在HTML使用的tag名
	template: `...`,                     //HTML樣板
  templateUrl: './元件.component.html', //載入HTML(擇一)
  styleUrls: ['./元件.component.css']   //載入樣式
})
export class 元件Component {

	//==注入==
	constructor(
		private route: ActivatedRoute,   //路由資訊
		private location: Location,      //瀏覽器資訊
		private fooService: FooService,  //自訂資料源
		private barService: BarService,
		) {}

	//==屬性==

	num = 1;
  str = "字串";
	fooList:Foo[] = [new Foo()];

	// https://angular.tw/guide/inputs-outputs 在父子指令及元件之間共享資料
	//@Input(): 放在子元件，父元件可傳參數給子元件
	// 使用方式
	// 在父元件: <app-item [bar]="aItem"></app-item>
	@Input() bar?: Bar;

	//@Output(): 放在子元件，子元件可發射事件給父元件
	// 使用方式
	// 在子元件: <button (click)="addNewItem(newItem.value)">Add</button>
	// 在父元件: <app-item (newItemEvent)="addItem($event)"></app-item>
	@Output() newItemEvent = new EventEmitter<string>();

	//==方法==

	getFooList() {
		this.fooService.getFooList().subscribe(fooList => {
			this.fooList = fooList;
		});
	}

	getBar() {
		const id = Number(this.route.snapshot.paramMap.get('id'));
		this.barService.getBar(id).subscribe(bar => {
			this.bar = bar;
		})
	}

	//==事件==

	addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

	//==事件:生命週期==

	ngOnInit(): void {
		this.getFooList();
		this.getBar();
	}

}
