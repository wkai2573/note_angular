//路由
const routes: Routes = [
	{path: '', redirectTo: '/dashboard', pathMatch: 'full'}, //'' 導向 '/dashboard'
	{path: 'foo', component: FooComponent},
	{path: 'detail/:id', component: FooDetailComponent}, //用id指定目標
	{path: 'bar', component: BarComponent},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)], //配置路由
	exports: [RouterModule]
})
export class AppRoutingModule {}
