declare namespace $ {

	export class Foo extends $mol_object {
		a( ): any
	}
	
	type Foo__a_7XFXZG27 = $mol_type_enforce< 
		ReturnType< Bar["b"] >,
		ReturnType< Foo["a"] >
	>
	export class Bar extends $mol_object {
		foo( ): ReturnType< Bar["Cls"] >
		Cls( ): Foo
		b: ( )=> ReturnType< Foo["a"] >
	}
	
}

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22%3F%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Cta%20null%5Cn%5Ct%5Ct%5Ct%5CtBar%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctfoo%20%3C%3D%20Cls%20Foo%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Cta%20%3D%3E%20b%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%3BAAAA%3BAAAA%2CAACI%2CiBAAI%2CoBAAJ%3BAACC%2CAAAA%2CQAAE%3BAADH%3BAADJ%3BAAKM%3BAAAA%2CAAAA%2CEAAE%2CYAFJ%2CGAEI%2CEAAG%2CCAAH%2CIADQ%3BAACV%2CEADU%2CiBACV%2CCADU%3BAAAA%3BAADZ%2CiBAAI%2CoBAAJ%3BAACC%2CAAAA%2CUAAI%2CYADL%2CGACK%2CEAAG%2CGAAH%3BAAAG%2CAAAA%2CUAAI%3BAACL%2CAAAA%2CGAAH%2CEAAG%2CGAAH%2CeAFJ%2CGAEI%2CEAAF%2CCAAE%3BAAFJ%3BAAHJ%3BAAAA%3B%22%7D