declare namespace _right_bind_indexed {

	export class Foo extends $mol_object {
		a( next?: ({ 
			'some': number,
		}) ): ({ 
			'some': number,
		})
	}
	
	type Foo__a_QYLYNT1E = $mol_type_enforce< 
		ReturnType< Bar["b"] >,
		ReturnType< Foo["a"] >
	>
	export class Bar extends $mol_object {
		Cls( id: any, ): Foo
		b: ( id: any, )=> ReturnType< Foo["a"] >
	}
	
}

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22%3F%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Cta%3F%20*%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ctsome%20123%5Cn%5Ct%5Ct%5Ct%5CtBar%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5CtCls*%20Foo%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Cta%20%3D%3E%20b*%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%3BAAAA%3BAAAA%2CAACI%2CiBAAI%2CoBAAJ%3BAACC%2CAAAA%2CYAAG%3BAAAA%2CAACF%2CWAAK%2CMAAL%3BAADE%2CEAAH%2CIAAG%3BAAAA%2CAACF%2CWAAK%2CMAAL%3BAADE%3BAADJ%3BAADJ%3BAAMM%3BAAAA%2CAAAA%2CEAAE%2CYAFJ%2CGAEI%2CEAAG%2CCAAH%2CIADE%3BAACJ%2CEADI%2CiBACJ%2CCADI%3BAAAA%3BAADN%2CiBAAI%2CoBAAJ%3BAACC%2CAAAA%2CmBAAK%3BAACC%2CAAAA%2CGAAH%2CEAAG%2CYAAH%2CeAFJ%2CGAEI%2CEAAF%2CCAAE%3BAAFJ%3BAAJJ%3BAAAA%3B%22%7D