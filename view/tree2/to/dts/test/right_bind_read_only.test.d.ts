declare namespace $ {

	export class Mvt2tjs_right_bind_read_onlyFoo extends $mol_object {
		a( id: any, next?: any ): any
	}
	
	type Mvt2tjs_right_bind_read_onlyFoo__a_XVZN014O = $mol_type_enforce< 
		ReturnType< Mvt2tjs_right_bind_read_onlyBar["b"] >,
		ReturnType< Mvt2tjs_right_bind_read_onlyFoo["a"] >
	>
	export class Mvt2tjs_right_bind_read_onlyBar extends $mol_object {
		Obj( ): Mvt2tjs_right_bind_read_onlyFoo
		b: ( id: any, next?: ReturnType< Mvt2tjs_right_bind_read_onlyFoo["a"] > )=> ReturnType< Mvt2tjs_right_bind_read_onlyFoo["a"] >
	}
	
}

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22right_bind_read_only.test.tree%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_right_bind_read_onlyFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Cta*%3F%20null%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_right_bind_read_onlyBar%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5CtObj%20Mvt2tjs_right_bind_read_onlyFoo%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Cta*%3F%20%3D%3E%20b*%3F%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%3BAAAA%3BAAAA%2CAACI%2C6CAAgC%2CoBAAhC%3BAACC%2CAAAA%2CqBAAI%2CGAAJ%2CIAAI%3BAADL%3BAADJ%3BAAKM%3BAAAA%2CAAAA%2CEAAI%2CYAFN%2C%2BBAEM%2CEAAG%2CCAAH%2CIADD%3BAACH%2CEADG%2C6CACH%2CCADG%3BAAAA%3BAADL%2C6CAAgC%2CoBAAhC%3BAACC%2CAAAA%2CUAAI%3BAACI%2CAAAA%2CGAAH%2CEAAG%2CkBAAH%2CYAFN%2C%2BBAEM%2CEAAJ%2CCAAI%2CIAAG%2CEAAH%2CeAFN%2C%2BBAEM%2CEAAJ%2CCAAI%3BAAFN%3BAAHJ%3BAAAA%3B%22%7D