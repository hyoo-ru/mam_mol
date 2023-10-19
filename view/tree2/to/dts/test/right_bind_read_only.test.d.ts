declare namespace $ {

	export class Foo extends $mol_object {
		a( id: any, next?: any ): any
	}
	
	type Foo__a_5T0VNSS1 = $mol_type_enforce< 
		ReturnType< Bar["b"] >,
		ReturnType< Foo["a"] >
	>
	export class Bar extends $mol_object {
		Obj( ): Foo
		b: ( id: any, next?: ReturnType< Foo["a"] > )=> ReturnType< Foo["a"] >
	}
	
}

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22%3F%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Cta*%3F%20null%5Cn%5Ct%5Ct%5Ct%5CtBar%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5CtObj%20Foo%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Cta*%3F%20%3D%3E%20b*%3F%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%3BAAAA%3BAAAA%2CAACI%2CiBAAI%2CoBAAJ%3BAACC%2CAAAA%2CqBAAI%2CGAAJ%2CIAAI%3BAADL%3BAADJ%3BAAKM%3BAAAA%2CAAAA%2CEAAI%2CYAFN%2CGAEM%2CEAAG%2CCAAH%2CIADD%3BAACH%2CEADG%2CiBACH%2CCADG%3BAAAA%3BAADL%2CiBAAI%2CoBAAJ%3BAACC%2CAAAA%2CUAAI%3BAACI%2CAAAA%2CGAAH%2CEAAG%2CkBAAH%2CYAFN%2CGAEM%2CEAAJ%2CCAAI%2CIAAG%2CEAAH%2CeAFN%2CGAEM%2CEAAJ%2CCAAI%3BAAFN%3BAAHJ%3BAAAA%3B%22%7D