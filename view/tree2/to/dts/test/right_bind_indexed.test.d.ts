declare namespace $ {

	export class Mvt2tjs_right_bind_indexedFoo extends $mol_object {
		a( next?: ({ 
			'some': number,
		}) ): ({ 
			'some': number,
		})
	}
	
	type Mvt2tjs_right_bind_indexedFoo__a_QQT5JZTM = $mol_type_enforce< 
		ReturnType< Mvt2tjs_right_bind_indexedBar["b"] >,
		ReturnType< Mvt2tjs_right_bind_indexedFoo["a"] >
	>
	export class Mvt2tjs_right_bind_indexedBar extends $mol_object {
		Cls( id: any, ): Mvt2tjs_right_bind_indexedFoo
		b: ( id: any, )=> ReturnType< Mvt2tjs_right_bind_indexedFoo["a"] >
	}
	
}

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22right_bind_indexed.test.tree%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_right_bind_indexedFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Cta%3F%20*%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ctsome%20123%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_right_bind_indexedBar%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5CtCls*%20Mvt2tjs_right_bind_indexedFoo%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Cta%20%3D%3E%20b*%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%3BAAAA%3BAAAA%2CAACI%2C2CAA8B%2CoBAA9B%3BAACC%2CAAAA%2CYAAG%3BAAAA%2CAACF%2CWAAK%2CMAAL%3BAADE%2CEAAH%2CIAAG%3BAAAA%2CAACF%2CWAAK%2CMAAL%3BAADE%3BAADJ%3BAADJ%3BAAMM%3BAAAA%2CAAAA%2CEAAE%2CYAFJ%2C6BAEI%2CEAAG%2CCAAH%2CIADE%3BAACJ%2CEADI%2C2CACJ%2CCADI%3BAAAA%3BAADN%2C2CAA8B%2CoBAA9B%3BAACC%2CAAAA%2CmBAAK%3BAACC%2CAAAA%2CGAAH%2CEAAG%2CYAAH%2CeAFJ%2C6BAEI%2CEAAF%2CCAAE%3BAAFJ%3BAAJJ%3BAAAA%3B%22%7D